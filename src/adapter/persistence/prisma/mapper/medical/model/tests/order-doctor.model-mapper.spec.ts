import { OrderDoctorModel } from "@omega/medical/core/model/order/order-doctor.model";
import { OrderDoctorModel as PrismaOrderDoctorModel } from "@prisma/client";
import { OrderDoctorModelMapper } from "../order-doctor.model-mapper";

describe('OrderDoctorModelMapper', () => {
    it('should correctly map a PrismaOrderDoctorModel to an OrderDoctorModel instance', () => {
        const prismaValue: PrismaOrderDoctorModel = {
            orderId: "order-123",
            orderProcess: "Post-Ocupacional",
            orderMail: false,
            orderStatus: "created",
            orderLeftReport: 0,
            orderEmissionDate: new Date(),
            doctorDni: "0123456789",
            patientDni: "0123456789"
        };

        const expectedValue = new OrderDoctorModel({ ...prismaValue, companyRuc: '' });
        const result = OrderDoctorModelMapper.toModel(prismaValue);
        expect(result.orderId).toBe(expectedValue.orderId);
        expect(result.orderProcess).toBe(expectedValue.orderProcess);
        expect(result.orderMail).toBe(expectedValue.orderMail);
        expect(result.orderStatus).toBe(expectedValue.orderStatus);
        expect(result.orderLeftReport).toBe(expectedValue.orderLeftReport);
        expect(result.orderEmissionDate).toBe(expectedValue.orderEmissionDate);
        expect(result.doctorDni).toBe(expectedValue.doctorDni);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.companyRuc).toBe('');

    });
});