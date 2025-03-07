import { Injectable, Provider } from "@nestjs/common";
import { ResultGetFilepathQuery } from "@omega/medical/application/queries/test/result-get-filepath.query";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResultGetFilepathQueryToken } from "../../inject/query.inject";

@Injectable()
class ResultGetFilepathNestQuery extends ResultGetFilepathQuery {
    constructor(
        @InjectModelRepository("ResultFilepath") repository: ResultFilepathRepository) {
        super(repository);
    }
}

export const ResultGetFilepathQueryProvider: Provider = {
    provide: ResultGetFilepathQueryToken,
    useClass: ResultGetFilepathNestQuery
}