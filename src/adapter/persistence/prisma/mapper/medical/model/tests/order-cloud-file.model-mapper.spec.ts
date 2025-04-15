import { OrderCloudFileModel } from "@omega/medical/core/model/order/order-cloud-file.model";
import { OrderCloudFileModel as PrismaOrderCloudFileModel } from "@prisma/client";
import { OrderCloudFileModelMapper } from "../order-cloud-file.model-mapper";

describe('OrderCloudFileModelMapper', () => {
    it('should correctly map a PrismaOrderCloudFileModel to an OrderCloudFileModel instance', () => {
        const prismaValue: PrismaOrderCloudFileModel = {
            testId: "test-123",
            patientDni: "1234567890",
            patientFullname: "Patient Fullname",
            orderId: "order-123",
            examName: "Exam",
            resultHasFile: true,
            reportHasContent: true
        };

        const expectedValue = new OrderCloudFileModel({ ...prismaValue });
        const result = OrderCloudFileModelMapper.toModel(prismaValue);
        expect(result.testId).toBe(expectedValue.testId);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.patientFullname).toBe(expectedValue.patientFullname);
        expect(result.orderId).toBe(expectedValue.orderId);
        expect(result.examName).toBe(expectedValue.examName);
        expect(result.resultHasFile).toBe(expectedValue.resultHasFile);
        expect(result.reportHasContent).toBe(expectedValue.reportHasContent);

    });
});