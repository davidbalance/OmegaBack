import { Injectable, Provider } from "@nestjs/common";
import { DiseaseReportRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { DiseaseReportFindManyQuery } from "@omega/medical/application/queries/test/disease-report-find-many.query";
import { DiseaseReportFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class DiseaseReportFindManyNestQuery extends DiseaseReportFindManyQuery {
    constructor(
        @InjectModelRepository("DiseaseReport") repository: DiseaseReportRepository
    ) {
        super(repository);
    }
}

export const DiseaseReportFindManyQueryProvider: Provider = {
    provide: DiseaseReportFindManyQueryToken,
    useClass: DiseaseReportFindManyNestQuery
}