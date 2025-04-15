import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { OrderExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";
import { OrderExternalConnectionModelMapper } from "../order-external-connection.model-mapper";

describe('OrderExternalConnectionModelMapper', () => {
    it('should correctly map a PrismaExternalConnection to an OrderExternalConnectionModel instance', () => {
        const prismaValue: PrismaExternalConnection = {
            orderId: "order-123",
            orderExternalKey: "key-123",
            orderExternalOwner: "key-owner",
            patientDni: "0123456789"
        };

        const expectedValue = new OrderExternalConnectionModel({ ...prismaValue });
        const result = OrderExternalConnectionModelMapper.toModel(prismaValue);
        expect(result.orderId).toBe(expectedValue.orderId);
        expect(result.orderExternalKey).toBe(expectedValue.orderExternalKey);
        expect(result.orderExternalOwner).toBe(expectedValue.orderExternalOwner);
        expect(result.patientDni).toBe(expectedValue.patientDni);
    });
});