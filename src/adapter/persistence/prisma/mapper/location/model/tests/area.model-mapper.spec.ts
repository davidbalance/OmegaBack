import { AreaModel } from "@omega/location/core/models/area/area.model";
import { AreaModel as PrismaAreaModel } from "@prisma/client";
import { AreaModelMapper } from "../area.model-mapper";

describe('AreaModelMapper', () => {
    it('should correctly map a PrismaAreaModel to an AreaModel instance', () => {
        const prismaValue: PrismaAreaModel = {
            areaId: 'area-123',
            areaName: 'Area'
        };

        const expectedValue = new AreaModel({ ...prismaValue });
        const result = AreaModelMapper.toModel(prismaValue);
        expect(result.areaId).toBe(expectedValue.areaId);
        expect(result.areaName).toBe(expectedValue.areaName);
    });
});
