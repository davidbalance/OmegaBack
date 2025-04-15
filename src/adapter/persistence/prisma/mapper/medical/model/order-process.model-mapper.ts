import { OrderProcessModel } from "@omega/medical/core/model/order/order-process.model";
import { OrderProcessModel as PrismaOrderProcessModel } from "@prisma/client";

export class OrderProcessModelMapper {
    static toModel(value: PrismaOrderProcessModel): OrderProcessModel {
        return new OrderProcessModel({ ...value });
    }
}