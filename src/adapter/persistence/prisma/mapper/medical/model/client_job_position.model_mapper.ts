import { ClientJobPositionModel } from "@omega/medical/core/model/client/client-job-position.model";
import { ClientJobPositionModel as PrismaClientJobPositionModel } from "@prisma/client";

export class ClientJobPositionModelMapper {
    static toModel(value: PrismaClientJobPositionModel): ClientJobPositionModel {
        return new ClientJobPositionModel({ ...value });
    }
}