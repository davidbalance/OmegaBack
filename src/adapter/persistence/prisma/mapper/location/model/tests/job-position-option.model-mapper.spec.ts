import { JobPositionOptionModel } from "@omega/location/core/models/jobPosition/job-position-option.model";
import { JobPositionOptionModel as PrismaJobPositionOptionModel } from "@prisma/client";
import { JobPositionOptionModelMapper } from "../job-position-option.model-mapper";

describe('JobPositionOptionModelMapper', () => {
    it('should correctly map a PrismaJobPositionOptionModel to an JobPositionOptionModel instance', () => {
        const prismaValue: PrismaJobPositionOptionModel = {
            jobPositionLabel: 'Job Label',
            jobPositionValue: 'jobPosition-123'
        };

        const expectedValue = new JobPositionOptionModel({ ...prismaValue });
        const result = JobPositionOptionModelMapper.toModel(prismaValue);
        expect(result.jobPositionLabel).toBe(expectedValue.jobPositionLabel);
        expect(result.jobPositionValue).toBe(expectedValue.jobPositionValue);
    });
});