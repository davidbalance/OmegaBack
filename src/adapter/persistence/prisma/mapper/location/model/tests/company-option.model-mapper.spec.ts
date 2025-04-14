import { CompanyOptionModel } from "@omega/location/core/models/corporative/company-option.model";
import { CompanyOptionModel as PrismaCompanyOptionModel } from "@prisma/client";
import { CompanyOptionModelMapper } from "../company-option.model-mapper";

describe('CompanyOptionModelMapper', () => {
    it('should correctly map a PrismaCompanyOptionModel to an CompanyOptionModel instance', () => {
        const prismaValue: PrismaCompanyOptionModel = {
            branchLabel: 'Branch label',
            branchValue: 'branch-123',
            companyLabel: 'Company Label',
            companyValue: 'company-123'
        };

        const expectedValue = new CompanyOptionModel({ ...prismaValue });
        const result = CompanyOptionModelMapper.toModel(prismaValue);
        expect(result.branchLabel).toBe(expectedValue.branchLabel);
        expect(result.branchValue).toBe(expectedValue.branchValue);
        expect(result.companyLabel).toBe(expectedValue.companyLabel);
        expect(result.companyValue).toBe(expectedValue.companyValue);
    });
});
