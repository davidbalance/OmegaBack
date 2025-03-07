import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { OrderModel as PrismaOrderModel } from "@prisma/client";

export class OrderModelMapper {
    static toModel(value: PrismaOrderModel): OrderModel {
        return new OrderModel({ ...value });
    }
}