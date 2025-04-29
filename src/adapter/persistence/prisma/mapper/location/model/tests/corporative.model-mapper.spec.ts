import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { CorporativeModel as PrismaCorporativeModel } from "@prisma/client";
import { CorporativeModelMapper } from "../corporative.model-mapper";

describe('CorporativeModelMapper', () => {
    it('should correctly map a PrismaCorporativeModel to an CorporativeModel instance', () => {
        const prismaValue: PrismaCorporativeModel = {
            corporativeId: 'id-123',
            corporativeName: 'Corporative',
            hasCompanies: true
        };

        const expectedValue = new CorporativeModel({ ...prismaValue });
        const result = CorporativeModelMapper.toModel(prismaValue);
        expect(result.corporativeId).toBe(expectedValue.corporativeId);
        expect(result.corporativeName).toBe(expectedValue.corporativeName);
        expect(result.hasCompanies).toBe(expectedValue.hasCompanies);
    });
});
