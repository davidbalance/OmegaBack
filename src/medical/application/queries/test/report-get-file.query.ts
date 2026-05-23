import { QueryHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { ReportModelProps } from "@omega/medical/core/model/test/report.model";
import { ReportRepository } from "../../repository/model.repositories";

export type ReportContent = Omit<ReportModelProps, 'testId'>

export type ReportLayoutFunc = (value: ReportContent) => unknown;
export type ReportGetFileQueryPayload = {
    testId: string;
}

export interface ReportGetFileQuery extends QueryHandlerAsync<ReportGetFileQueryPayload, Buffer> { }

export class ReportGetFileQueryImpl implements ReportGetFileQuery {
    constructor(
        private readonly file: FileOperation,
        private readonly repository: ReportRepository,
        private readonly pdf: PdfProvider,
        private readonly layout: ReportLayoutFunc
    ) { }

    async handleAsync(query: ReportGetFileQueryPayload): Promise<Buffer> {
        const value = await this.repository.findOneAsync([{ field: 'testId', operator: 'eq', value: query.testId }]);
        if (!value) throw new TestNotFoundError(query.testId);

        if (value.reportFilepath) {
            const buffer = await this.file.read(value.reportFilepath);
            return buffer;
        }

        const bufferSignature = await this.file.read(value.doctorSignature);
        const base64Signature = bufferSignature.toString('base64');

        const buffer = await this.pdf.craft(this.layout({
            doctorSignature: `data:image/png;base64,${base64Signature}`,
            reportContent: value.reportContent,
            patientFullname: value.patientFullname,
            patientAge: value.patientAge,
            patientDni: value.patientDni,
            locationCompanyName: value.locationCompanyName,
            examName: value.examName,
            doctorFullname: value.doctorFullname,
            doctorDni: value.doctorDni,
            reportEmissionDate: value.reportEmissionDate,
            reportFilepath: null
        }))

        return buffer;
    }
}