import { Test, TestingModule } from "@nestjs/testing";
import { JobPositionPrismaRepository } from "../job-position.prisma-repository";
import { Logger } from "@nestjs/common";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { JobPosition, JobPositionProps } from "@omega/location/core/domain/job-position/job-position.domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { JobPositionDomainMapper } from "@omega/adapter/persistence/prisma/mapper/location/domain/job-position.domain-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { JobPositionIsEvent, JobPositionRemovedEventPayload, JobPositionRenamedEventPayload } from "@omega/location/core/domain/job-position/events/job-position.event";
import { Prisma } from "@prisma/client";

describe("JobPositionPrismaRepository", () => {
    let repository: JobPositionPrismaRepository;
    let prisma: { jobPosition: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            jobPosition: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JobPositionPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<JobPositionPrismaRepository>(JobPositionPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<JobPositionProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "jobPosition-1" };
            const domainResult = { id: "jobPosition-1" };

            prisma.jobPosition.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(JobPositionDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.jobPosition.findFirst).toHaveBeenCalledWith({ where: mockPrismaWhere, });
            expect(JobPositionDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.jobPosition.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.jobPosition.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): JobPosition => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as JobPosition);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(JobPositionIsEvent, "isJobPositionRenamedEvent").mockReturnValue(false);
            jest.spyOn(JobPositionIsEvent, "isJobPositionRemovedEvent").mockReturnValue(false);
        });

        it("should call createJobPosition when event is JobPositionCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "JobPositionCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createJobPosition").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call renameJobPosition when event is JobPositionRenamedEvent", async () => {
            const payload = { jobPositionId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "JobPositionPasswordEditedEvent", value: payload });

            jest.spyOn(JobPositionIsEvent, "isJobPositionRenamedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "renameJobPosition").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeJobPosition when event is JobPositionApikeyAddedEvent", async () => {
            const payload = { id: "apikey-1" };
            const aggregate = createFakeAggregate({ key: "JobPositionApikeyAddedEvent", value: payload });

            jest.spyOn(JobPositionIsEvent, "isJobPositionRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeJobPosition").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createJobPosition", () => {
            const value = {} as unknown as JobPosition;
            const mapped: Prisma.JobPositionUncheckedCreateInput = {
                name: "JobPosition"
            };

            it('should create a new jobPosition using the mapped domain data', async () => {
                jest.spyOn(JobPositionDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createJobPosition(value);

                expect(JobPositionDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.jobPosition.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.jobPosition.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(JobPositionDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createJobPosition(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("renameJobPosition", () => {
            const value: JobPositionRenamedEventPayload = {
                jobPositionId: "jobPosition-id-123",
                jobPositionName: "JobPosition"
            };

            it('should update the jobPosition name with the given id', async () => {
                await repository.renameJobPosition(value);

                expect(prisma.jobPosition.update).toHaveBeenCalledWith({
                    where: { id: value.jobPositionId },
                    data: { name: value.jobPositionName }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.jobPosition.update.mockRejectedValue(new Error("fail"));

                await expect(repository.renameJobPosition(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeJobPosition", () => {
            const value: JobPositionRemovedEventPayload = {
                jobPositionId: "jobPosition-id-123"
            };

            it('should delete the jobPosition by id', async () => {
                await repository.removeJobPosition(value);

                expect(prisma.jobPosition.delete).toHaveBeenCalledWith({
                    where: { id: value.jobPositionId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.jobPosition.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeJobPosition(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});