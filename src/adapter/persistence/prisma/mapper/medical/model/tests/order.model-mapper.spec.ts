import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { OrderModel as PrismaOrderModel } from "@prisma/client";
import { OrderModelMapper } from "../order.model-mapper";

describe('OrderModelMapper', () => {
    it('should correctly map a PrismaOrderModel to an OrderModel instance', () => {
        const prismaValue: PrismaOrderModel = {
            orderId: "order-123",
            orderMail: false,
            orderProcess: "Post-Ocupacional",
            orderEmissionDate: new Date(),
            orderStatus: "created",
            orderYear: 2025,
            companyRuc: "0123456789001",
            patientDni: "1234567890"
        };

        const expectedValue = new OrderModel({ ...prismaValue });
        const result = OrderModelMapper.toModel(prismaValue);

        expect(result.orderId).toBe(expectedValue.orderId);
        expect(result.orderMail).toBe(expectedValue.orderMail);
        expect(result.orderProcess).toBe(expectedValue.orderProcess);
        expect(result.orderEmissionDate).toBe(expectedValue.orderEmissionDate);
        expect(result.orderStatus).toBe(expectedValue.orderStatus);
        expect(result.companyRuc).toBe(expectedValue.companyRuc);
        expect(result.patientDni).toBe(expectedValue.patientDni);
    });
});