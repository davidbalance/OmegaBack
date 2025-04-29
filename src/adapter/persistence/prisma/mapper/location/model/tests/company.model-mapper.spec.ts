import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { CompanyModel as PrismaCompanyOptionModel } from "@prisma/client";
import { CompanyModelMapper } from "../company.model-mapper";

describe('CompanyModelMapper', () => {
    it('should correctly map a PrismaCompanyOptionModel to an CompanyModel instance', () => {
        const prismaValue: PrismaCompanyOptionModel = {
            companyId: 'id-123',
            companyAddress: 'Address, Maple Street 123',
            companyName: 'Comapny',
            companyPhone: '099999999',
            companyRuc: '0123456789001',
            corporativeId: 'corporative-123',
            hasBranches: true
        };

        const expectedValue = new CompanyModel({ ...prismaValue });
        const result = CompanyModelMapper.toModel(prismaValue);
        expect(result.companyId).toBe(expectedValue.companyId);
        expect(result.companyAddress).toBe(expectedValue.companyAddress);
        expect(result.companyName).toBe(expectedValue.companyName);
        expect(result.companyPhone).toBe(expectedValue.companyPhone);
        expect(result.companyRuc).toBe(expectedValue.companyRuc);
        expect(result.corporativeId).toBe(expectedValue.corporativeId);
        expect(result.hasBranches).toBe(expectedValue.hasBranches);
    });
});
