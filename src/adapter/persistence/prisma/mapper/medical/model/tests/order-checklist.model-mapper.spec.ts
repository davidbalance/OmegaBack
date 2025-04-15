import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { OrderChecklistModel as PrismaOrderChecklistModel } from "@prisma/client";
import { OrderChecklistModelMapper } from "../order-checklist.model-mapper";

describe('OrderChecklistModelMapper', () => {
    it('should correctly map a PrismaOrderChecklistModel to an OrderChecklistModel instance', () => {
        const prismaValue: PrismaOrderChecklistModel = {
            testId: "id-123",
            testCheck: false,
            examName: "Exam",
            patientDni: "1234567890",
            patientName: "Patient",
            patientLastname: "Lastname",
            orderId: "order-123",
            orderProcess: "Post-Ocupacional",
            orderEmissionDate: new Date(),
            locationCompanyRuc: "0123456789001",
            locationCompanyName: "Company",
            locationJobPosition: "Job Position"
        };

        const expectedValue = new OrderChecklistModel({ ...prismaValue });
        const result = OrderChecklistModelMapper.toModel(prismaValue);
        expect(result.testId).toBe(expectedValue.testId);
        expect(result.testCheck).toBe(expectedValue.testCheck);
        expect(result.examName).toBe(expectedValue.examName);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.patientName).toBe(expectedValue.patientName);
        expect(result.patientLastname).toBe(expectedValue.patientLastname);
        expect(result.orderId).toBe(expectedValue.orderId);
        expect(result.orderProcess).toBe(expectedValue.orderProcess);
        expect(result.orderEmissionDate).toBe(expectedValue.orderEmissionDate);
        expect(result.locationCompanyRuc).toBe(expectedValue.locationCompanyRuc);
        expect(result.locationCompanyName).toBe(expectedValue.locationCompanyName);
        expect(result.locationJobPosition).toBe(expectedValue.locationJobPosition);

    });
});