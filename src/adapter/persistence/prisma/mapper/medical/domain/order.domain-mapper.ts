import { Order } from "@omega/medical/core/domain/order/order.domain";
import { MedicalOrder as PrismaOrder, Prisma } from "@prisma/client";

export class OrderDomainMapper {
    static toPrisma(value: Order): Prisma.MedicalOrderUncheckedCreateInput {
        return {
            year: value.year,
            process: value.process,
            clientId: value.patientId,
            doctorDni: value.doctor.dni,
            doctorFullname: value.doctor.fullname,
            doctorSignature: value.doctor.signature,
            locationCorporativeName: value.location.corporativeName,
            locationCompanyRuc: value.location.companyRuc,
            locationCompanyName: value.location.companyName,
            locationBranchName: value.location.branchName
        };
    }

    static toDomain(value: PrismaOrder): Order {
        return Order.rehydrate({
            ...value,
            patientId: value.clientId
        });
    }
}