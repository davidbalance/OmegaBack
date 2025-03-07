import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { OrderChecklistModel as PrismaOrderChecklistModel } from "@prisma/client";

export class OrderChecklistModelMapper {
    static toModel(value: PrismaOrderChecklistModel): OrderChecklistModel {
        return new OrderChecklistModel({ ...value });
    }
}