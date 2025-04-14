import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ReportFindOneQueryToken } from "../../inject/query.inject";
import { ReportRepository } from "@omega/medical/application/repository/model.repositories";
import { ReportFindOneQuery } from "@omega/medical/application/queries/test/report-find-one.query";

@Injectable()
class ReportFindOneNestQuery extends ReportFindOneQuery {
    constructor(
        @InjectModelRepository("Report") repository: ReportRepository
    ) {
        super(repository);
    }
}

export const ReportFindOneQueryProvider: Provider = {
    provide: ReportFindOneQueryToken,
    useClass: ReportFindOneNestQuery
}