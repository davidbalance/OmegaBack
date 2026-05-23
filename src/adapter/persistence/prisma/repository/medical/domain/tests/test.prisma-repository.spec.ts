import { Logger } from "@nestjs/common";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { Prisma } from "@prisma/client";
import { TestPrismaRepository } from "../test.prisma-repository";
import { Test as TestDomain, TestProps } from "@omega/medical/core/domain/test/test.domain";
import { TestDomainMapper } from "@omega/adapter/persistence/prisma/mapper/medical/domain/test.domain-mapper";
import { Test, TestingModule } from "@nestjs/testing";
import { TestCheckedEventPayload, TestDiseaseRemovedEventPayload, TestExamChangedEventPayload, TestIsEvent, TestReactivatedEventPayload, TestRemovedEventPayload, TestUncheckedEventPayload } from "@omega/medical/core/domain/test/events/test.events";
import { ResultFileAddedEventPayload, ResultFileRemovedEventPayload, ResultIsEvent } from "@omega/medical/core/domain/test/events/result.events";
import { ReportAddedContentEventPayload, ReportAddedFilepathEventPayload, ReportIsEvent, ReportRemovedContentEventPayload } from "@omega/medical/core/domain/test/events/report.events";
import { DiseaseReportIsEvent } from "@omega/medical/core/domain/test/events/disease.events";
import { DiseaseReport } from "@omega/medical/core/domain/test/disease-report.domain";
import { DiseaseReportDomainMapper } from "@omega/adapter/persistence/prisma/mapper/medical/domain/disease-report.domain-mapper";
import { TestExternalKey } from "@omega/medical/core/domain/test/value-objects/test-external-key.value-object";
import { ResultDomainMapper } from "@omega/adapter/persistence/prisma/mapper/medical/domain/result.domain-mapper";
import { Result } from "@omega/medical/core/domain/test/result.domain";
import { Report } from "@omega/medical/core/domain/test/report.domain";
import { ReportDomainMapper } from "@omega/adapter/persistence/prisma/mapper/medical/domain/report.domain-mapper";

describe("TestPrismaRepository", () => {
    let repository: TestPrismaRepository;
    let prisma;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            medicalTest: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            },
            medicalResult: {
                create: jest.fn(),
                update: jest.fn(),
            },
            medicalReport: {
                create: jest.fn(),
                update: jest.fn(),
            },
            medicalDiseaseReport: {
                create: jest.fn(),
                delete: jest.fn(),
                update: jest.fn(),
            },
            medicalTestExternalKey: {
                create: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<TestPrismaRepository>(TestPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<TestProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "medicalTest-1" };
            const domainResult = { id: "medicalTest-1" };

            prisma.medicalTest.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(TestDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.medicalTest.findFirst).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                include: { result: true, report: true, diseases: true, externalKeys: true },
            });
            expect(TestDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.medicalTest.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.medicalTest.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): TestDomain => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as TestDomain);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(TestIsEvent, "isTestRemovedEvent").mockReturnValue(false);
            jest.spyOn(TestIsEvent, "isTestReactivatedEvent").mockReturnValue(false);
            jest.spyOn(TestIsEvent, "isTestCheckedEvent").mockReturnValue(false);
            jest.spyOn(TestIsEvent, "isTestUncheckedEvent").mockReturnValue(false);
            jest.spyOn(TestIsEvent, "isTestExamChangedEvent").mockReturnValue(false);
            jest.spyOn(TestIsEvent, "isTestDiseaseAddedEvent").mockReturnValue(false);
            jest.spyOn(TestIsEvent, "isTestDiseaseRemovedEvent").mockReturnValue(false);
            jest.spyOn(TestIsEvent, "isTestExternalKeyAddedEvent").mockReturnValue(false);
            jest.spyOn(ResultIsEvent, "isResultCreatedEvent").mockReturnValue(false);
            jest.spyOn(ResultIsEvent, "isResultFileAddedEvent").mockReturnValue(false);
            jest.spyOn(ResultIsEvent, "isResultFileRemovedEvent").mockReturnValue(false);
            jest.spyOn(ReportIsEvent, "isReportCreatedEvent").mockReturnValue(false);
            jest.spyOn(ReportIsEvent, "isReportAddedContentEvent").mockReturnValue(false);
            jest.spyOn(ReportIsEvent, "isReportAddedFilepathEvent").mockReturnValue(false);
            jest.spyOn(ReportIsEvent, "isReportRemovedContentEvent").mockReturnValue(false);
            jest.spyOn(DiseaseReportIsEvent, "isDiseaseReportUpdatedEvent").mockReturnValue(false);
        });

        it("should call createTest when event is TestCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "TestCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createTest").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call removeTest when event is TestRemovedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "isTestRemovedEvent", value: payload });

            jest.spyOn(TestIsEvent, "isTestRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeTest").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call reactivateTest when event is TestReactivatedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "TestReactivatedEvent", value: payload });

            jest.spyOn(TestIsEvent, "isTestReactivatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "reactivateTest").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call checkTest when event is TestCheckedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "TestCheckedEvent", value: payload });

            jest.spyOn(TestIsEvent, "isTestCheckedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "checkTest").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call uncheckTest when event is TestUncheckedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "TestUncheckedEvent", value: payload });

            jest.spyOn(TestIsEvent, "isTestUncheckedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "uncheckTest").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call changeExam when event is TestExamChangedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "TestExamChangedEvent", value: payload });

            jest.spyOn(TestIsEvent, "isTestExamChangedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "changeExam").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addDiseaseReport when event is TestDiseaseAddedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "TestDiseaseAddedEvent", value: payload });

            jest.spyOn(TestIsEvent, "isTestDiseaseAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addDiseaseReport").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeDiseaseReport when event is TestDiseaseRemovedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "TestDiseaseRemovedEvent", value: payload });

            jest.spyOn(TestIsEvent, "isTestDiseaseRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeDiseaseReport").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addTestExternalKey when event is TestExternalKeyAddedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "TestExternalKeyAddedEvent", value: payload });

            jest.spyOn(TestIsEvent, "isTestExternalKeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addTestExternalKey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addResult when event is ResultFileAddedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "ResultFileAddedEvent", value: payload });

            jest.spyOn(ResultIsEvent, "isResultFileAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addResult").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call createResult when event is ResultCreatedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "ResultCreatedEvent", value: payload });

            jest.spyOn(ResultIsEvent, "isResultCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createResult").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeResult when event is ResultFileRemovedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "ResultFileRemovedEvent", value: payload });

            jest.spyOn(ResultIsEvent, "isResultFileRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeResult").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call createReport when event is ReportCreatedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "ReportCreatedEvent", value: payload });

            jest.spyOn(ReportIsEvent, "isReportCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createReport").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addReport when event is ReportAddedContentEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "ReportAddedContentEvent", value: payload });

            jest.spyOn(ReportIsEvent, "isReportAddedContentEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addReport").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeReport when event is ReportRemovedContentEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "ReportRemovedContentEvent", value: payload });

            jest.spyOn(ReportIsEvent, "isReportRemovedContentEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeReport").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call editDiseaseReport when event is DiseaseReportUpdatedEvent", async () => {
            const payload = {};
            const aggregate = createFakeAggregate({ key: "DiseaseReportUpdatedEvent", value: payload });

            jest.spyOn(DiseaseReportIsEvent, "isDiseaseReportUpdatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "editDiseaseReport").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {

        describe("createTest", () => {
            const value = {} as unknown as TestDomain;
            const mapped: Prisma.MedicalTestUncheckedCreateInput = {
                examName: "Exam",
                examSubtype: "Subtype",
                examType: "Type",
                orderId: "order-id-123"
            };

            it('should call Prisma create with mapped test domain data', async () => {
                jest.spyOn(TestDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createTest(value);

                expect(TestDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.medicalTest.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalTest.create.mockRejectedValue(Error);

                jest.spyOn(TestDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createTest(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeTest", () => {
            const value: TestRemovedEventPayload = {
                testId: "test-id-123"
            };

            it('should mark the test as inactive using Prisma', async () => {
                await repository.removeTest(value);

                expect(prisma.medicalTest.update).toHaveBeenCalledWith({
                    where: { id: value.testId },
                    data: { isActive: false }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalTest.update.mockRejectedValue(Error);

                await expect(repository.removeTest(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("reactivateTest", () => {
            const value: TestReactivatedEventPayload = {
                testId: "test-id-123"
            };

            it('should mark the test as active using Prisma', async () => {
                await repository.reactivateTest(value);

                expect(prisma.medicalTest.update).toHaveBeenCalledWith({
                    where: { id: value.testId },
                    data: { isActive: true }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalTest.update.mockRejectedValue(Error);

                await expect(repository.reactivateTest(value)).rejects.toThrow(RepositoryError);
            });
        });


        describe('checkTest', () => {
            const value: TestCheckedEventPayload = {
                testId: "test-id-123"
            }

            it('should update the test checklist flag to true', async () => {
                await repository.checkTest(value);

                expect(prisma.medicalTest.update).toHaveBeenCalledWith({
                    where: { id: value.testId },
                    data: { checklist: true }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalTest.update.mockRejectedValue(Error);

                await expect(repository.checkTest(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('uncheckTest', () => {
            const value: TestUncheckedEventPayload = {
                testId: "test-id-123"
            };

            it('should update the test checklist flag to false', async () => {
                await repository.uncheckTest(value);

                expect(prisma.medicalTest.update).toHaveBeenCalledWith({
                    where: { id: value.testId },
                    data: { checklist: false }
                });
            });


            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalTest.update.mockRejectedValue(Error);

                await expect(repository.uncheckTest(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('changeExam', () => {
            const value: TestExamChangedEventPayload = {
                examName: 'Exam',
                examSubtype: 'Subtype',
                examType: 'Type',
                testId: 'test-id-123'
            };

            it('should update exam-related fields on the test', async () => {
                await repository.changeExam(value);

                expect(prisma.medicalTest.update).toHaveBeenCalledWith({
                    where: { id: value.testId },
                    data: {
                        examName: value.examName,
                        examSubtype: value.examSubtype,
                        examType: value.examType
                    }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalTest.update.mockRejectedValue(Error);

                await expect(repository.changeExam(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeDiseaseReport', () => {
            const value: TestDiseaseRemovedEventPayload = {
                diseaseId: "disease-id-123"
            };

            it('should delete the disease report from the test', async () => {
                await repository.removeDiseaseReport(value);

                expect(prisma.medicalDiseaseReport.delete).toHaveBeenCalledWith({
                    where: { id: value.diseaseId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalDiseaseReport.delete.mockRejectedValue(Error);

                await expect(repository.removeDiseaseReport(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addTestExternalKey', () => {
            const value: TestExternalKey = {
                owner: 'test-owner',
                value: 'test-value',
                testId: 'test-id-123',
            } as unknown as TestExternalKey;

            it('should create a new external key linked to the test', async () => {
                await repository.addTestExternalKey(value);

                expect(prisma.medicalTestExternalKey.create).toHaveBeenCalledWith({
                    data: {
                        owner: value.owner,
                        value: value.value,
                        testId: value.testId
                    }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalTestExternalKey.create.mockRejectedValue(Error);

                await expect(repository.addTestExternalKey(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('createResult', () => {
            const value: Result = {} as unknown as Result;
            const mapped: Prisma.MedicalResultUncheckedCreateInput = {
                testId: "test-id-123"
            };

            it('should call Prisma create with mapped result domain data', async () => {
                jest.spyOn(ResultDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createResult(value);

                expect(ResultDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.medicalResult.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalResult.create.mockRejectedValue(Error);

                jest.spyOn(ResultDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createResult(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addResult', () => {
            const value: ResultFileAddedEventPayload = {
                resultId: "result-id-123",
                filepath: "/path/to/file"
            }

            it('should update the result with a filepath and set hasFile to true', async () => {
                await repository.addResult(value);

                expect(prisma.medicalResult.update).toHaveBeenCalledWith({
                    where: { id: value.resultId },
                    data: { filepath: value.filepath, hasFile: true }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalResult.update.mockRejectedValue(Error);

                await expect(repository.addResult(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeResult', () => {
            const value: ResultFileRemovedEventPayload = {
                resultId: "result-id-123"
            }

            it('should set hasFile to false on the result', async () => {
                await repository.removeResult(value);

                expect(prisma.medicalResult.update).toHaveBeenCalledWith({
                    where: { id: value.resultId },
                    data: { hasFile: false }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalResult.update.mockRejectedValue(Error);

                await expect(repository.removeResult(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('createReport', () => {
            const value: Report = {} as unknown as Report;
            const mapped: Prisma.MedicalReportUncheckedCreateInput = {
                testId: "test-id-123"
            };

            it('should call Prisma create with mapped report domain data', async () => {
                jest.spyOn(ReportDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createReport(value);

                expect(ReportDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.medicalReport.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalReport.create.mockRejectedValue(Error);

                jest.spyOn(ReportDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createReport(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addReport', () => {
            const value: ReportAddedContentEventPayload = {
                reportId: "report-id-123",
                content: "Test content..."
            }

            it('should update the report with content and nullify filepath', async () => {
                await repository.addReport(value);

                expect(prisma.medicalReport.update).toHaveBeenCalledWith({
                    where: { id: value.reportId },
                    data: { content: value.content, filepath: null }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalReport.update.mockRejectedValue(Error);

                await expect(repository.addReport(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addReportFilepath', () => {
            const value: ReportAddedFilepathEventPayload = {
                reportId: "report-id-123",
                filepath: "/path/to/file"
            }

            it('should update the report with a filepath', async () => {
                await repository.addReportFilepath(value);

                expect(prisma.medicalReport.update).toHaveBeenCalledWith({
                    where: { id: value.reportId },
                    data: { filepath: value.filepath }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalReport.update.mockRejectedValue(Error);

                await expect(repository.addReportFilepath(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeReport', () => {
            const value: ReportRemovedContentEventPayload = {
                reportId: "report-id-123"
            }

            it('should nullify both content and filepath on the report', async () => {
                await repository.removeReport(value);

                expect(prisma.medicalReport.update).toHaveBeenCalledWith({
                    where: { id: value.reportId },
                    data: { content: null, filepath: null }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalReport.update.mockRejectedValue(Error);

                await expect(repository.removeReport(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addDiseaseReport', () => {
            const value: DiseaseReport = {} as unknown as DiseaseReport;
            const mapped: Prisma.MedicalDiseaseReportUncheckedCreateInput = {
                diseaseId: "disease-id-123",
                diseaseName: "Disease",
                diseaseGroupId: "group-id-123",
                diseaseGroupName: "Group",
                commentary: "Commentary",
                testId: "test-id-123"
            };

            it('should create a disease report for the test', async () => {
                jest.spyOn(DiseaseReportDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.addDiseaseReport(value);

                expect(DiseaseReportDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.medicalDiseaseReport.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalDiseaseReport.create.mockRejectedValue(Error);

                jest.spyOn(DiseaseReportDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.addDiseaseReport(value)).rejects.toThrow(RepositoryError);
            });
        });


        describe('editDiseaseReport', () => {
            const value: DiseaseReport = {
                commentary: 'Test Commentary...',
                diseaseId: 'disease-id-123',
                diseaseName: 'Disease',
                diseaseGroupId: 'group-id-123',
                diseaseGroupName: 'Group',
            } as unknown as DiseaseReport;

            it('should update fields of an existing disease report', async () => {
                await repository.editDiseaseReport(value);

                expect(prisma.medicalDiseaseReport.update).toHaveBeenCalledWith({
                    where: { id: value.id },
                    data: {
                        commentary: value.commentary,
                        diseaseId: value.diseaseId,
                        diseaseName: value.diseaseName,
                        diseaseGroupId: value.diseaseGroupId,
                        diseaseGroupName: value.diseaseGroupName,
                    }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalDiseaseReport.update.mockRejectedValue(Error);

                await expect(repository.editDiseaseReport(value)).rejects.toThrow(RepositoryError);
            });
        });
    });
});