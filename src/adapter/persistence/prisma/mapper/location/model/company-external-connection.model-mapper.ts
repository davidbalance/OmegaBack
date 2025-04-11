import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { CompanyExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";

export class CompanyExternalConnectionModelMapper {
    static toModel(value: PrismaExternalConnection): CompanyExternalConnectionModel {
        return new CompanyExternalConnectionModel({ ...value });
    }
}