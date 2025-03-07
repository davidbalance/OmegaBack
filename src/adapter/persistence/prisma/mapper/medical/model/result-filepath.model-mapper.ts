import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";
import { ResultFilepathModel as PrismaResultFilepathModel } from "@prisma/client";

export class ResultFilepathModelMapper {
    static toModel(value: PrismaResultFilepathModel): ResultFilepathModel {
        return new ResultFilepathModel({ ...value });
    }
}