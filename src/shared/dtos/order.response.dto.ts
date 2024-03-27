import { Order } from "@/medical-order/order/entities/order.entity";

export class CreateOrderResponseDTO { }

export class FindOrderResponseDTO {
    orders: Order[]
}