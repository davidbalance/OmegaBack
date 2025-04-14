import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { OrderResponseDto } from "../dto/response/order.dto";

export class OrderModelMapper {
    public static toDTO(value: OrderModel): OrderResponseDto {
        return {
            orderEmissionDate: value.orderEmissionDate,
            orderId: value.orderId,
            orderMail: value.orderMail,
            orderProcess: value.orderProcess,
            orderStatus: value.orderStatus,
        }
    }
}