import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { JobPositionModel as PrismaJobPositionModel } from "@prisma/client";
import { JobPositionModelMapper } from "../job-position.model-mapper";

describe('JobPositionModelMapper', () => {
    it('should correctly map a PrismaJobPositionModel to an JobPositionModel instance', () => {
        const prismaValue: PrismaJobPositionModel = {
            jobPositionId: 'id-123',
            jobPositionName: 'Job position'
        };

        const expectedValue = new JobPositionModel({ ...prismaValue });
        const result = JobPositionModelMapper.toModel(prismaValue);
        expect(result.jobPositionId).toBe(expectedValue.jobPositionId);
        expect(result.jobPositionName).toBe(expectedValue.jobPositionName);
    });
});
