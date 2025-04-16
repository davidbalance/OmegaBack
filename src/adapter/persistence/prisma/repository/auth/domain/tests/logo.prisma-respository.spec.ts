import { Logger } from "@nestjs/common";
import { LogoPrismaRepository } from "../logo.prisma-respository";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { Logo, LogoProps } from "@omega/auth/core/domain/logo/logo.domain";
import { Prisma } from "@prisma/client";
import { LogoDomainMapper } from "@omega/adapter/persistence/prisma/mapper/auth/domain/logo.domain-mapper";

describe("LogoPrismaRepository", () => {
    let repository: LogoPrismaRepository;
    let prisma: { logo: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            logo: {
                findFirst: jest.fn(),
                create: jest.fn()
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LogoPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<LogoPrismaRepository>(LogoPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<LogoProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "logo-1" };
            const domainResult = { id: "logo-1" };

            prisma.logo.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(LogoDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.logo.findFirst).toHaveBeenCalledWith({
                where: mockPrismaWhere,
            });
            expect(LogoDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.logo.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.logo.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): Logo => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as Logo);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
        });

        it("should call createLogo when event is LogoCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "LogoCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createLogo").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });
    });

    describe('Internal Methods', () => {
        describe("createLogo", () => {
            const value = {} as unknown as Logo;
            const mapped: Prisma.LogoUncheckedCreateInput = {
                name: 'logo'
            };

            it("should create a new aggregate using the mapped Prisma data", async () => {
                jest.spyOn(LogoDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createLogo(value);

                expect(LogoDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.logo.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.logo.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(LogoDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createLogo(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});