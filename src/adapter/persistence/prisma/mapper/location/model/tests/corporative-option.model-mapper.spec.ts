import { CorporativeOptionModel } from "@omega/location/core/models/corporative/corporative-option.model";
import { CorporativeOptionModel as PrismaCorporativeOptionModel } from "@prisma/client";
import { CorporativeOptionModelMapper } from "../corporative-option.model-mapper";

describe('CorporativeOptionModelMapper', () => {
    it('should correctly map a PrismaCorporativeOptionModel to an CorporativeOptionModel instance', () => {
        const prismaValue: PrismaCorporativeOptionModel = {
            corporativeLabel: 'Corporative label',
            corporativeValue: 'corporative-123',
            companyLabel: 'Company Label',
            companyValue: 'company-123'
        };

        const expectedValue = new CorporativeOptionModel({ ...prismaValue });
        const result = CorporativeOptionModelMapper.toModel(prismaValue);
        expect(result.corporativeLabel).toBe(expectedValue.corporativeLabel);
        expect(result.corporativeValue).toBe(expectedValue.corporativeValue);
        expect(result.companyLabel).toBe(expectedValue.companyLabel);
        expect(result.companyValue).toBe(expectedValue.companyValue);
    });
});
