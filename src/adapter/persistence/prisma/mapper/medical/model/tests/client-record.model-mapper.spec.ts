import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { ClientRecordModel as PrismaClientRecordModel } from "@prisma/client";
import { ClientRecordModelMapper } from "../client-record.model-mapper";

describe('ClientRecordModelMapper', () => {
    it('should correctly map a PrismaClientRecordModel to an ClientRecordModel instance', () => {
        const prismaValue: PrismaClientRecordModel = {
            patientDni: "123456789",
            recordEmissionDate: new Date(),
            recordFilepath: '/path/to/file',
            recordId: 'record-123',
            recordName: 'Record'
        };

        const expectedValue = new ClientRecordModel({ ...prismaValue, });
        const result = ClientRecordModelMapper.toModel(prismaValue);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.recordEmissionDate).toBe(expectedValue.recordEmissionDate);
        expect(result.recordFilepath).toBe(expectedValue.recordFilepath);
        expect(result.recordId).toBe(expectedValue.recordId);
        expect(result.recordName).toBe(expectedValue.recordName);
    });
});
