import { OrderCloudFileModel } from "@omega/medical/core/model/order/order-cloud-file.model";
import { OrderCloudFileModel as PrismaOrderCloudFileModel } from "@prisma/client";

export class OrderCloudFileModelMapper {
    static toModel(value: PrismaOrderCloudFileModel): OrderCloudFileModel {
        return new OrderCloudFileModel({ ...value });
    }
}