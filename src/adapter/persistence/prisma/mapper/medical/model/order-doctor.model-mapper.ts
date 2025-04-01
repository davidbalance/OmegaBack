import { OrderDoctorModel } from "@omega/medical/core/model/order/order-doctor.model";
import { OrderDoctorModel as PrismaOrderDoctorModel } from "@prisma/client";

export class OrderDoctorModelMapper {
    static toModel(value: PrismaOrderDoctorModel): OrderDoctorModel {
        return new OrderDoctorModel({ ...value });
    }
}