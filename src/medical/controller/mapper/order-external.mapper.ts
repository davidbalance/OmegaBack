import { OrderExternalConnectionModel } from "@prisma/client";
import { OrderExternalResponseDto } from "../dto/response/order-external.dto";

export class OrderExternalModelMapper {
    public static toDTO(value: OrderExternalConnectionModel): OrderExternalResponseDto {
        return {
            orderId: value.orderId,
            orderExternalKey: value.orderExternalKey,
            orderExternalOwner: value.orderExternalOwner,
            patientDni: value.patientDni,
        }
    }
}