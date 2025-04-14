import { OrderPatientModel } from "@omega/medical/core/model/order/order-patient.model";
import { OrderPatientModel as PrismaOrderPatientModel } from "@prisma/client";

export class OrderPatientModelMapper {
    static toModel(value: PrismaOrderPatientModel): OrderPatientModel {
        return new OrderPatientModel({
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
        });
    }
}