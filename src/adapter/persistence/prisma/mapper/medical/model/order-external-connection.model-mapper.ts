import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { OrderExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";

export class OrderExternalConnectionModelMapper {
    static toModel(value: PrismaExternalConnection): OrderExternalConnectionModel {
        return new OrderExternalConnectionModel({ ...value });
    }
}