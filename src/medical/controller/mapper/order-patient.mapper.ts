import { OrderPatientResponseDto } from "../dto/response/order.dto";
import { OrderPatientModel } from "@omega/medical/core/model/order/order-patient.model";

export class OrderPatientModelMapper {
    public static toDTO(value: OrderPatientModel): OrderPatientResponseDto {
        return {
            orderId: value.orderId,
            orderMail: value.orderMail,
            orderProcess: value.orderProcess,
            orderEmissionDate: value.orderEmissionDate,
            orderStatus: value.orderStatus,
            patientName: value.patientName,
            patientLastname: value.patientLastname,
            patientDni: value.patientDni,
            locationCorporative: value.locationCorporative,
            locationCompanyRuc: value.locationCompanyRuc,
            locationCompanyName: value.locationCompanyName,
            locationBranchName: value.locationBranchName,
        }
    }
}