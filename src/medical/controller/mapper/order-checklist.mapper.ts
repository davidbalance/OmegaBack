import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { OrderChecklistResponseDto } from "../dto/response/order.dto";

export class OrderChecklistModelMapper {
    public static toDTO(value: OrderChecklistModel): OrderChecklistResponseDto {
        return {
            testId: value.testId,
            testCheck: value.testCheck,
            examName: value.examName,
            patientDni: value.patientDni,
            patientName: value.patientName,
            patientLastname: value.patientLastname,
            orderId: value.orderId,
            orderProcess: value.orderProcess,
            orderEmissionDate: value.orderEmissionDate,
            locationCompanyRuc: value.locationCompanyRuc,
            locationCompanyName: value.locationCompanyName,
            locationJobPosition: value.locationJobPosition,
        }
    }
}