import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { Test, TestProps } from "@omega/medical/core/domain/test/test.domain";
import { TestDomainMapper } from "../../../mapper/medical/domain/test.domain-mapper";
import { TestCheckedEventPayload, TestDiseaseRemovedEventPayload, TestExamChangedEventPayload, TestIsEvent, TestReactivatedEventPayload, TestRemovedEventPayload, TestUncheckedEventPayload } from "@omega/medical/core/domain/test/events/test.events";
import { DiseaseReport } from "@omega/medical/core/domain/test/disease_report.domain";
import { DiseaseReportDomainMapper } from "../../../mapper/medical/domain/disease_report.domain-mapper";
import { ResultFileAddedEventPayload, ResultFileRemovedEventPayload, ResultIsEvent } from "@omega/medical/core/domain/test/events/result.events";
import { ResultDomainMapper } from "../../../mapper/medical/domain/result.domain-mapper";
import { Result } from "@omega/medical/core/domain/test/result.domain";
import { Report } from "@omega/medical/core/domain/test/report.domain";
import { ReportDomainMapper } from "../../../mapper/medical/domain/report.domain-mapper";
import { ReportAddedContentEventPayload, ReportAddedFilepathEventPayload, ReportIsEvent, ReportRemovedContentEventPayload } from "@omega/medical/core/domain/test/events/report.events";
import { DiseaseReportIsEvent } from "@omega/medical/core/domain/test/events/disease.events";
import { TestAggregateRepositoryToken } from "@omega/medical/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class TestPrismaRepository implements TestRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<TestProps>): Promise<Test | null> {
        try {
            const where = PrismaFilterMapper.map<TestProps, Prisma.MedicalTestWhereInput>(filter.filter);
            const value = await this.prisma.medicalTest.findFirst({
                include: { result: true, report: true, diseases: true },
                where: where
            });
            return value ? TestDomainMapper.toDomain({
                ...value,
                report: value.report!,
                result: value.result!
            }) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Test): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Test>(event))
                await this.createTest(aggregate);

            else if (TestIsEvent.isTestRemovedEvent(event))
                await this.removeTest(event.value);

            else if (TestIsEvent.isTestReactivatedEvent(event))
                await this.reactivateTest(event.value);

            else if (TestIsEvent.isTestCheckedEvent(event))
                await this.checkTest(event.value);

            else if (TestIsEvent.isTestUncheckedEvent(event))
                await this.uncheckTest(event.value);

            else if (TestIsEvent.isTestExamChangedEvent(event))
                await this.changeExam(event.value);

            else if (TestIsEvent.isTestDiseaseAddedEvent(event))
                await this.addDiseaseReport(event.value);

            else if (TestIsEvent.isTestDiseaseRemovedEvent(event))
                await this.removeDiseaeReport(event.value);

            else if (ResultIsEvent.isResultFileAddedEvent(event))
                await this.addResult(event.value);

            else if (ResultIsEvent.isResultCreatedEvent(event))
                await this.createResult(event.value);

            else if (ResultIsEvent.isResultFileRemovedEvent(event))
                await this.removeResult(event.value);

            else if (ReportIsEvent.isReportCreatedEvent(event))
                await this.createReport(event.value);

            else if (ReportIsEvent.isReportAddedContentEvent(event))
                await this.addReport(event.value);

            else if (ReportIsEvent.isReportAddedFilepathEvent(event))
                await this.addReportFilepath(event.value);

            else if (ReportIsEvent.isReportRemovedContentEvent(event))
                await this.removeReport(event.value);

            else if (DiseaseReportIsEvent.isDiseaseReportUpdatedEvent(event))
                await this.editDiseaseReport(event.value);
        }
    }

    async createTest(value: Test): Promise<void> {
        try {
            const data = TestDomainMapper.toPrisma(value);
            await this.prisma.medicalTest.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async createResult(value: Result): Promise<void> {
        try {
            const data = ResultDomainMapper.toPrisma(value);
            await this.prisma.medicalResult.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async createReport(value: Report): Promise<void> {
        try {
            const data = ReportDomainMapper.toPrisma(value);
            await this.prisma.medicalReport.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeTest(value: TestRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalTest.update({ where: { id: value.testId }, data: { isActive: false } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async reactivateTest(value: TestReactivatedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalTest.update({ where: { id: value.testId }, data: { isActive: true } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async checkTest(value: TestCheckedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalTest.update({ where: { id: value.testId }, data: { checklist: true } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async uncheckTest(value: TestUncheckedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalTest.update({ where: { id: value.testId }, data: { checklist: false } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async changeExam(value: TestExamChangedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalTest.update({
                where: { id: value.testId }, data: {
                    examName: value.examName,
                    examSubtype: value.examSubtype,
                    examType: value.examType
                }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addDiseaseReport(value: DiseaseReport): Promise<void> {
        try {
            const data = DiseaseReportDomainMapper.toPrisma(value);
            await this.prisma.medicalDiseaseReport.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeDiseaeReport(value: TestDiseaseRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalDiseaseReport.delete({ where: { id: value.diseaseId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addResult(value: ResultFileAddedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalResult.update({
                where: { id: value.resultId },
                data: { filepath: value.filepath, hasFile: true }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeResult(value: ResultFileRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalResult.update({ where: { id: value.resultId }, data: { hasFile: false } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addReport(value: ReportAddedContentEventPayload): Promise<void> {
        try {
            await this.prisma.medicalReport.update({ where: { id: value.reportId }, data: { content: value.content, filepath: null } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addReportFilepath(value: ReportAddedFilepathEventPayload): Promise<void> {
        try {
            await this.prisma.medicalReport.update({ where: { id: value.reportId }, data: { filepath: value.filepath } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeReport(value: ReportRemovedContentEventPayload): Promise<void> {
        try {
            await this.prisma.medicalReport.update({ where: { id: value.reportId }, data: { content: null, filepath: null } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async editDiseaseReport(value: DiseaseReport): Promise<void> {
        try {
            await this.prisma.medicalDiseaseReport.update({
                where: { id: value.id },
                data: {
                    commentary: value.commentary,
                    diseaseId: value.diseaseId,
                    diseaseName: value.diseaseName,
                    diseaseGroupId: value.diseaseGroupId,
                    diseaseGroupName: value.diseaseGroupName,
                }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const TestAggregateRepositoryProvider: Provider = {
    provide: TestAggregateRepositoryToken,
    useClass: TestPrismaRepository,
}