import { OrderProcessResponseDto } from "../dto/response/order.dto";
import { OrderProcessModel } from "@omega/medical/core/model/order/order-process.model";

export class OrderProcessModelMapper {
    public static toDTO(value: OrderProcessModel): OrderProcessResponseDto {
        return {
            orderProcess: value.orderProcess
        }
    }
}