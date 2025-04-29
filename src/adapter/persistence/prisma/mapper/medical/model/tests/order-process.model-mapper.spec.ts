import { OrderProcessModel } from "@omega/medical/core/model/order/order-process.model";
import { OrderProcessModel as PrismaOrderProcessModel } from "@prisma/client";
import { OrderProcessModelMapper } from "../order-process.model-mapper";

describe('OrderProcessModelMapper', () => {
    it('should correctly map a PrismaOrderProcessModel to an OrderProcessModel instance', () => {
        const prismaValue: PrismaOrderProcessModel = {
            orderProcess: "Post-Ocupacional"
        };

        const expectedValue = new OrderProcessModel({ ...prismaValue });
        const result = OrderProcessModelMapper.toModel(prismaValue);
        expect(result.orderProcess).toBe(expectedValue.orderProcess);
    });
});