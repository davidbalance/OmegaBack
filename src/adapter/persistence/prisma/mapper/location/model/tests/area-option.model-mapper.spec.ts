import { AreaOptionModel } from "@omega/location/core/models/area/area-option.model";
import { AreaOptionModel as PrismaAreaOptionModel } from "@prisma/client";
import { AreaOptionModelMapper } from "../area-option.model-mapper";

describe('AreaOptionModelMapper', () => {
    it('should correctly map a PrismaAreaOptionModel to an AreaOptionModel instance', () => {
        const prismaValue: PrismaAreaOptionModel = {
            areaLabel: 'Area Label',
            areaValue: 'area-123'
        };

        const expectedValue = new AreaOptionModel({ ...prismaValue });
        const result = AreaOptionModelMapper.toModel(prismaValue);
        expect(result.areaLabel).toBe(expectedValue.areaLabel);
        expect(result.areaValue).toBe(expectedValue.areaValue);
    });
});
