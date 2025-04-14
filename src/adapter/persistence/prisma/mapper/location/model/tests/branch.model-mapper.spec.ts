import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { BranchModel as PrismaBranchModel } from "@prisma/client";
import { BranchModelMapper } from "../branch.model-mapper";

describe('BranchModelMapper', () => {
    it('should correctly map a PrismaBranchModel to an BranchModel instance', () => {
        const prismaValue: PrismaBranchModel = {
            branchId: 'id-123',
            branchName: 'Branch',
            cityName: 'Quito',
            companyId: 'company-123'
        };

        const expectedValue = new BranchModel({ ...prismaValue });
        const result = BranchModelMapper.toModel(prismaValue);
        expect(result.branchId).toBe(expectedValue.branchId);
        expect(result.branchName).toBe(expectedValue.branchName);
        expect(result.cityName).toBe(expectedValue.cityName);
        expect(result.companyId).toBe(expectedValue.companyId);
    });
});
