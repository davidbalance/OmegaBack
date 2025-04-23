import { OrderDoctorModel } from "@omega/medical/core/model/order/order-doctor.model";
import { OrderDoctorResponseDto } from "../dto/response/order.dto";

export class OrderDoctorModelMapper {
    public static toDTO(value: OrderDoctorModel): OrderDoctorResponseDto {
        return {
            orderEmissionDate: value.orderEmissionDate,
            orderId: value.orderId,
            orderMail: value.orderMail,
            orderProcess: value.orderProcess,
            orderStatus: value.orderStatus,
            orderLeftReport: value.orderLeftReport
        }
    }
}