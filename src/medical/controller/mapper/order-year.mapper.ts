import { OrderYearModel } from "@omega/medical/core/model/order/order-year.model";
import { OrderYearResponseDto } from "../dto/response/order.dto";

export class OrderYearModelMapper {
    public static toDTO(value: OrderYearModel): OrderYearResponseDto {
        return {
            orderYear: value.orderYear
        }
    }
}