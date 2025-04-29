import { ClientJobPositionModel } from "@omega/medical/core/model/client/client-job-position.model";
import { ClientJobPositionModel as PrismaClientJobPositionModel } from "@prisma/client";
import { ClientJobPositionModelMapper } from "../client-job-position.model-mapper";

describe('ClientJobPositionModelMapper', () => {
    it('should correctly map a PrismaClientJobPositionModel to an ClientJobPositionModel instance', () => {
        const prismaValue: PrismaClientJobPositionModel = {
            patientDni: "123456789",
            jobPosition: "Position"
        };

        const expectedValue = new ClientJobPositionModel({ ...prismaValue, });
        const result = ClientJobPositionModelMapper.toModel(prismaValue);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.jobPosition).toBe(expectedValue.jobPosition);
    });
});
