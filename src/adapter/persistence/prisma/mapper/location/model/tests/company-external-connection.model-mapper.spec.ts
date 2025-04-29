import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { CompanyExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";
import { CompanyExternalConnectionModelMapper } from "../company-external-connection.model-mapper";

describe('CompanyExternalConnectionModelMapper', () => {
    it('should correctly map a PrismaExternalConnection to an CompanyExternalConnectionModel instance', () => {
        const prismaValue: PrismaExternalConnection = {
            companyExternalKey: 'key-123',
            companyExternalOwner: 'owner',
            companyId: 'company-123',
            corporativeId: 'branch-123',
        };

        const expectedValue = new CompanyExternalConnectionModel({ ...prismaValue });
        const result = CompanyExternalConnectionModelMapper.toModel(prismaValue);
        expect(result.companyExternalKey).toBe(expectedValue.companyExternalKey);
        expect(result.companyExternalOwner).toBe(expectedValue.companyExternalOwner);
        expect(result.companyId).toBe(expectedValue.companyId);
        expect(result.corporativeId).toBe(expectedValue.corporativeId);
    });
});
