import { ClientEmailModel } from "@omega/medical/core/model/client/client-email.model";
import { ClientEmailModel as PrismaClientEmailModel } from "@prisma/client";
import { ClientEmailModelMapper } from "../client-email.model-mapper";

describe('ClientEmailModelMapper', () => {
    it('should correctly map a PrismaClientEmailModel to an ClientEmailModel instance', () => {
        const prismaValue: PrismaClientEmailModel = {
            patientDni: "123456789",
            emailDefault: true,
            emailId: 'email-123',
            emailValue: 'test@email.com'
        };

        const expectedValue = new ClientEmailModel({ ...prismaValue, });
        const result = ClientEmailModelMapper.toModel(prismaValue);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.emailDefault).toBe(expectedValue.emailDefault);
        expect(result.emailId).toBe(expectedValue.emailId);
        expect(result.emailValue).toBe(expectedValue.emailValue);
    });
});
