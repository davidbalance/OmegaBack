import { Test, TestingModule } from "@nestjs/testing";
import { CorporativePrismaRepository } from "../corporative.prisma-repository";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { Logger } from "@nestjs/common";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { Corporative, CorporativeProps } from "@omega/location/core/domain/corporative/corporative.domain";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { CorporativeDomainMapper } from "@omega/adapter/persistence/prisma/mapper/location/domain/corporative.domain-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { CorporativeCompanyMovedEventPayload, CorporativeCompanyRemovedEventPayload, CorporativeIsEvent, CorporativeRemovedEventPayload } from "@omega/location/core/domain/corporative/events/corporative.events";
import { CompanyBranchMovedEventPayload, CompanyBranchRemovedEventPayload, CompanyIsEvent } from "@omega/location/core/domain/corporative/events/company.events";
import { BranchIsEvent } from "@omega/location/core/domain/corporative/events/branch.events";
import { CorporativeExternalKeyProps } from "@omega/location/core/domain/corporative/value-objects/corporative-external-key.value-object";
import { Company } from "@omega/location/core/domain/corporative/company.domain";
import { Branch } from "@omega/location/core/domain/corporative/branch.domain";
import { CompanyExternalKeyProps } from "@omega/location/core/domain/corporative/value-objects/company-external-key.value-object";
import { BranchExternalKeyProps } from "@omega/location/core/domain/corporative/value-objects/branch-external-key.value-object";
import { Prisma } from "@prisma/client";
import { CompanyDomainMapper } from "@omega/adapter/persistence/prisma/mapper/location/domain/company.domain-mapper";
import { BranchDomainMapper } from "@omega/adapter/persistence/prisma/mapper/location/domain/branch.domain-mapper";

describe("CorporativePrismaRepository", () => {
    let repository: CorporativePrismaRepository;
    let prisma: { corporativeGroup: any; corporativeExternalKey: any; company: any; companyExternalKey: any; branch: any; branchExternalKey: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            corporativeGroup: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            },
            corporativeExternalKey: {
                create: jest.fn()
            },
            company: {
                create: jest.fn(),
                delete: jest.fn(),
                update: jest.fn(),
            },
            companyExternalKey: {
                create: jest.fn()
            },
            branch: {
                create: jest.fn(),
                delete: jest.fn(),
                update: jest.fn(),
            },
            branchExternalKey: {
                create: jest.fn()
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CorporativePrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<CorporativePrismaRepository>(CorporativePrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<CorporativeProps> = { filter: [{ field: "id", operator: "eq", value: "id-123" }] };
        const mockPrismaWhere = { id: "id-123" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "corporativeGroup-1" };
            const domainResult = { id: "corporativeGroup-1" };

            prisma.corporativeGroup.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(CorporativeDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.corporativeGroup.findFirst).toHaveBeenCalledWith({
                include: {
                    externalKeys: true,
                    companies: {
                        include: {
                            branches: { include: { externalKeys: true } },
                            externalKeys: true
                        }
                    }
                },
                where: mockPrismaWhere,
            });
            expect(CorporativeDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.corporativeGroup.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.corporativeGroup.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): Corporative => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as Corporative);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(CorporativeIsEvent, 'isCorporativeRemovedEvent').mockReturnValue(false);
            jest.spyOn(CorporativeIsEvent, 'isCorporativeCompanyAddedEvent').mockReturnValue(false);
            jest.spyOn(CorporativeIsEvent, 'isCorporativeCompanyRemovedEvent').mockReturnValue(false);
            jest.spyOn(CorporativeIsEvent, 'isCorporativeCompanyMovedEvent').mockReturnValue(false);
            jest.spyOn(CorporativeIsEvent, 'isCorporativeExternalKeyAddedEvent').mockReturnValue(false);
            jest.spyOn(CompanyIsEvent, 'isCompanyBranchAddedEvent').mockReturnValue(false);
            jest.spyOn(CompanyIsEvent, 'isCompanyBranchRemovedEvent').mockReturnValue(false);
            jest.spyOn(CompanyIsEvent, 'isCompanyBranchMovedEvent').mockReturnValue(false);
            jest.spyOn(CompanyIsEvent, 'isCompanyExternalKeyAddedEvent').mockReturnValue(false);
            jest.spyOn(BranchIsEvent, 'isBranchExternalKeyAddedEvent').mockReturnValue(false);
        });

        it("should call createCorporative when event is CorporativeCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "CorporativeCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createCorporative").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call removeCorporative when event is CorporativeRemovedEvent", async () => {
            const payload: CorporativeRemovedEventPayload = {
                corporativeId: 'corporative-id-123'
            };
            const aggregate = createFakeAggregate({ key: "CorporativeRemovedEvent", value: payload });

            jest.spyOn(CorporativeIsEvent, "isCorporativeRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeCorporative").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addCompany when event is CorporativeCompanyAddedEvent", async () => {
            const payload: Company = {} as unknown as Company;
            const aggregate = createFakeAggregate({ key: "CorporativeCompanyAddedEvent", value: payload });

            jest.spyOn(CorporativeIsEvent, "isCorporativeCompanyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addCompany").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeCompany when event is CorporativeCompanyRemovedEvent", async () => {
            const payload: CorporativeCompanyRemovedEventPayload = { companyId: "id-123" };
            const aggregate = createFakeAggregate({ key: "CorporativeCompanyRemovedEvent", value: payload });

            jest.spyOn(CorporativeIsEvent, "isCorporativeCompanyRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeCompany").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call moveCompany when event is CorporativeCompanyMovedEvent", async () => {
            const payload: CorporativeCompanyMovedEventPayload = {
                fromCorporativeId: 'corporative-id-123',
                companyId: 'company-id-123',
                toCorporativeId: 'corporative-id-456'
            };
            const aggregate = createFakeAggregate({ key: "CorporativeCompanyMovedEvent", value: payload });

            jest.spyOn(CorporativeIsEvent, "isCorporativeCompanyMovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "moveCompany").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addCorporativeExternalKey when event is CorporativeExternalKeyAddedEvent", async () => {
            const payload: CorporativeExternalKeyProps = {
                owner: 'test-owner',
                corporativeId: 'test-id-123',
                value: 'test-value'
            };
            const aggregate = createFakeAggregate({ key: "CorporativeExternalKeyAddedEvent", value: payload });

            jest.spyOn(CorporativeIsEvent, "isCorporativeExternalKeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addCorporativeExternalKey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addBranch when event is CompanyBranchRemovedEvent", async () => {
            const payload = {} as unknown as Branch;
            const aggregate = createFakeAggregate({ key: "CompanyBranchRemovedEvent", value: payload });

            jest.spyOn(CompanyIsEvent, "isCompanyBranchAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addBranch").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeBranch when event is CompanyBranchMovedEvent", async () => {
            const payload: CompanyBranchRemovedEventPayload = { branchId: 'id-123' };
            const aggregate = createFakeAggregate({ key: "CompanyBranchMovedEvent", value: payload });

            jest.spyOn(CompanyIsEvent, "isCompanyBranchRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeBranch").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call moveBranch when event is CompanyBranchMovedEvent", async () => {
            const payload: CompanyBranchMovedEventPayload = {
                fromCorporativeId: 'corporative-id-123',
                toCorporativeId: 'corporative-id-456',
                fromCompanyId: 'company-id-123',
                toCompanyId: 'company-id-456',
                branchId: 'branch-id-123'
            };
            const aggregate = createFakeAggregate({ key: "CompanyBranchMovedEvent", value: payload });

            jest.spyOn(CompanyIsEvent, "isCompanyBranchMovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "moveBranch").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addCompanyExternalKey when event is CompanyExternalKeyAddedEvent", async () => {
            const payload: CompanyExternalKeyProps = {
                owner: 'test-owner',
                companyId: 'company-id-123',
                value: 'test-value'
            };
            const aggregate = createFakeAggregate({ key: "CompanyExternalKeyAddedEvent", value: payload });

            jest.spyOn(CompanyIsEvent, "isCompanyExternalKeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addCompanyExternalKey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addBranchExternalKey when event is BranchExternalKeyAddedEvent", async () => {
            const payload: BranchExternalKeyProps = {
                owner: 'test-owner',
                branchId: 'branch-id-123',
                value: 'test-value'
            };
            const aggregate = createFakeAggregate({ key: "BranchExternalKeyAddedEvent", value: payload });

            jest.spyOn(BranchIsEvent, "isBranchExternalKeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addBranchExternalKey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {

        describe('createCorporative', () => {
            const value = {} as unknown as Corporative;
            const mapped: Prisma.CorporativeGroupUncheckedCreateInput = { name: "Test Name" };

            it('should create a new corporative group using the mapped domain data', async () => {
                jest.spyOn(CorporativeDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createCorporative(value);

                expect(CorporativeDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.corporativeGroup.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.corporativeGroup.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(CorporativeDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createCorporative(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeCorporative', () => {
            const value: CorporativeRemovedEventPayload = { corporativeId: "corporative-id-123" };

            it('should mark the corporative group as inactive', async () => {
                await repository.removeCorporative(value);

                expect(prisma.corporativeGroup.update).toHaveBeenCalledWith({
                    where: { id: value.corporativeId },
                    data: { isActive: false }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.corporativeGroup.update.mockRejectedValue(new Error("fail"));

                await expect(repository.removeCorporative(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addCompany', () => {
            const value = {} as unknown as Company;
            const mapped: Prisma.CompanyUncheckedCreateInput = {
                name: "Sample Company",
                ruc: "0123456789001",
                address: "Test Address, Maple Stree 123",
                phone: "0999999999",
                corporativeId: "corporative-id-123"
            };

            it('should create a new company using the mapped domain data', async () => {
                jest.spyOn(CompanyDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.addCompany(value);

                expect(CompanyDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.company.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.company.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(CompanyDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.addCompany(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeCompany', () => {
            const value: CorporativeCompanyRemovedEventPayload = {
                companyId: "company-id-123"
            };

            it('should delete a company by id', async () => {
                await repository.removeCompany(value);

                expect(prisma.company.delete).toHaveBeenCalledWith({ where: { id: value.companyId } });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.company.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeCompany(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('moveCompany', () => {
            const value: CorporativeCompanyMovedEventPayload = {
                fromCorporativeId: "branch-corporative-id-123",
                toCorporativeId: "branch-to-corporative-id-123",
                companyId: "branch-company-id-123"
            };

            it('should move the company to a new corporative group', async () => {
                await repository.moveCompany(value);

                expect(prisma.company.update).toHaveBeenCalledWith({
                    where: { id: value.companyId },
                    data: { corporativeId: value.toCorporativeId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.company.update.mockRejectedValue(new Error("fail"));

                await expect(repository.moveCompany(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addCorporativeExternalKey', () => {
            const value: CorporativeExternalKeyProps = {
                owner: 'owner-id-123',
                corporativeId: 'corporative-id-123',
                value: 'Test Value'
            };

            it('should add a new external key to the corporative group', async () => {
                await repository.addCorporativeExternalKey(value);

                expect(prisma.corporativeExternalKey.create).toHaveBeenCalledWith({
                    data: { owner: value.owner, value: value.value, corporativeId: value.corporativeId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.corporativeExternalKey.create.mockRejectedValue(new Error("fail"));

                await expect(repository.addCorporativeExternalKey(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addBranch', () => {
            const value = {} as unknown as Branch;
            const mapped: Prisma.BranchUncheckedCreateInput = {
                name: "Branch",
                cityId: 0,
                companyId: "company-id-123"
            };

            it('should create a new branch using the mapped domain data', async () => {
                jest.spyOn(BranchDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.addBranch(value);

                expect(BranchDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.branch.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.branch.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(BranchDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.addBranch(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeBranch', () => {
            const value: CompanyBranchRemovedEventPayload = {
                branchId: "branch-id-123",
            };

            it('should delete a branch by id', async () => {
                await repository.removeBranch(value);

                expect(prisma.branch.delete).toHaveBeenCalledWith({ where: { id: value.branchId } });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.branch.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeBranch(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('moveBranch', () => {
            const value: CompanyBranchMovedEventPayload = {
                fromCorporativeId: 'corporative-id-123',
                toCorporativeId: 'corporative-id-456',
                fromCompanyId: 'company-id-123',
                toCompanyId: 'company-id-456',
                branchId: 'branch-id-123'
            };

            it('should move the branch to a new company', async () => {
                await repository.moveBranch(value);

                expect(prisma.branch.update).toHaveBeenCalledWith({
                    where: { id: value.branchId },
                    data: { companyId: value.toCompanyId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.branch.update.mockRejectedValue(new Error("fail"));

                await expect(repository.moveBranch(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addCompanyExternalKey', () => {
            const value: CompanyExternalKeyProps = {
                owner: 'owner',
                companyId: 'company-id-123',
                value: 'Subtype-value'
            };

            it('should add a new external key to the company', async () => {
                await repository.addCompanyExternalKey(value);

                expect(prisma.companyExternalKey.create).toHaveBeenCalledWith({
                    data: { owner: value.owner, value: value.value, companyId: value.companyId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.companyExternalKey.create.mockRejectedValue(new Error("fail"));

                await expect(repository.addCompanyExternalKey(value)).rejects.toThrow(RepositoryError);
            });
        });


        describe('addBranchExternalKey', () => {
            const value: BranchExternalKeyProps = {
                owner: 'owner-123',
                branchId: 'branch-id-123',
                value: 'branch-value'
            };

            it('should add a new external key to the branch', async () => {
                await repository.addBranchExternalKey(value);

                expect(prisma.branchExternalKey.create).toHaveBeenCalledWith({
                    data: { owner: value.owner, value: value.value, branchId: value.branchId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.branchExternalKey.create.mockRejectedValue(new Error("fail"));

                await expect(repository.addBranchExternalKey(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});