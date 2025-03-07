import { Injectable, Provider } from "@nestjs/common";
import { DiseaseReportFindOneQuery } from "@omega/medical/application/queries/test/disease-report-find-one.query";
import { DiseaseReportRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { DiseaseReportFindOneQueryToken } from "../../inject/query.inject";

@Injectable()
class DiseaseReportFindOneNestQuery extends DiseaseReportFindOneQuery {
    constructor(
        @InjectModelRepository("DiseaseReport") repository: DiseaseReportRepository
    ) {
        super(repository);
    }
}

export const DiseaseReportFindOneQueryProvider: Provider = {
    provide: DiseaseReportFindOneQueryToken,
    useClass: DiseaseReportFindOneNestQuery
}