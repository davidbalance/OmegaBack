import { Inject, Injectable, Provider } from "@nestjs/common";
import { InjectFile, InjectPdf } from "@shared/shared/nest/inject";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ReportGetFileQueryToken } from "../../inject/query.inject";
import { ReportRepository } from "@omega/medical/application/repository/model.repositories";
import { FileOperation } from "@shared/shared/providers";
import { ReportGetFileQueryImpl, ReportLayoutFunc } from "@omega/medical/application/queries/test/report-get-file.query";
import { ReportLayoutToken } from "../../inject/function.inject";

@Injectable()
class ReportGetFileNestQuery extends ReportGetFileQueryImpl {
    constructor(
        @InjectFile() file: FileOperation,
        @InjectModelRepository("Report") repository: ReportRepository,
        @InjectPdf() pdf: PdfProvider,
        @Inject(ReportLayoutToken) layout: ReportLayoutFunc
    ) {
        super(file, repository, pdf, layout);
    }
}

export const ReportGetFileQueryProvider: Provider = {
    provide: ReportGetFileQueryToken,
    useClass: ReportGetFileNestQuery
}