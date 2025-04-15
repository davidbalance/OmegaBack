import { OrderYearModel } from "@omega/medical/core/model/order/order-year.model";
import { OrderYearModel as PrismaOrderYearModel } from "@prisma/client";

export class OrderYearModelMapper {
    static toModel(value: PrismaOrderYearModel): OrderYearModel {
        return new OrderYearModel({ ...value });
    }
}