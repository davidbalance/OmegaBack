import { OrderYearModel } from "@omega/medical/core/model/order/order-year.model";
import { OrderYearModel as PrismaOrderYearModel } from "@prisma/client";
import { OrderYearModelMapper } from "../order-year.model-mapper";

describe('OrderYearModelMapper', () => {
    it('should correctly map a PrismaOrderYearModel to an OrderYearModel instance', () => {
        const prismaValue: PrismaOrderYearModel = {
            orderYear: 2025
        };

        const expectedValue = new OrderYearModel({ ...prismaValue });
        const result = OrderYearModelMapper.toModel(prismaValue);
        expect(result.orderYear).toBe(expectedValue.orderYear);
    });
});