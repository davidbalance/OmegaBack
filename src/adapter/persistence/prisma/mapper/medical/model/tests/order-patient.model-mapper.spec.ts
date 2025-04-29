import { OrderPatientModel } from "@omega/medical/core/model/order/order-patient.model";
import { OrderPatientModel as PrismaOrderPatientModel } from "@prisma/client";
import { OrderPatientModelMapper } from "../order-patient.model-mapper";

describe('OrderPatientModelMapper', () => {
    it('should correctly map a PrismaOrderPatientModel to an OrderPatientModel instance', () => {
        const prismaValue: PrismaOrderPatientModel = {
            orderId: "order-123",
            orderProcess: "Post-Ocupacional",
            orderMail: false,
            orderEmissionDate: new Date(),
            orderStatus: "created",
            patientDni: "0123456789",
            patientName: "Patient",
            patientLastname: "Lastname",
            locationCorporative: "Corporative",
            locationCompanyRuc: "0123456789001",
            locationCompanyName: "Company",
            locationBranchName: "Branch"
        };

        const expectedValue = new OrderPatientModel({ ...prismaValue });
        const result = OrderPatientModelMapper.toModel(prismaValue);
        expect(result.orderId).toBe(expectedValue.orderId);
        expect(result.orderProcess).toBe(expectedValue.orderProcess);
        expect(result.orderMail).toBe(expectedValue.orderMail);
        expect(result.orderEmissionDate).toBe(expectedValue.orderEmissionDate);
        expect(result.orderStatus).toBe(expectedValue.orderStatus);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.patientName).toBe(expectedValue.patientName);
        expect(result.patientLastname).toBe(expectedValue.patientLastname);
        expect(result.locationCorporative).toBe(expectedValue.locationCorporative);
        expect(result.locationCompanyRuc).toBe(expectedValue.locationCompanyRuc);
        expect(result.locationCompanyName).toBe(expectedValue.locationCompanyName);
        expect(result.locationBranchName).toBe(expectedValue.locationBranchName);
    });
});