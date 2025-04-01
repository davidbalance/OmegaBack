import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CorporativeExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";

export class CorporativeExternalConnectionModelMapper {
    static toModel(value: PrismaExternalConnection): CorporativeExternalConnectionModel {
        return new CorporativeExternalConnectionModel({ ...value });
    }
}