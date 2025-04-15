import { Order } from "@omega/medical/core/domain/order/order.domain";
import { OrderExternalKey } from "@omega/medical/core/domain/order/value_objects/order-external-key.value-object";
import { MedicalOrder as PrismaOrder, MedicalOrderExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";

export type PrismaOrderExtended = PrismaOrder & { externalKeys: PrismaExternalKey[] };

export class OrderDomainMapper {
    static toPrisma(value: Order): Prisma.MedicalOrderUncheckedCreateInput {
        return {
            id: value.id,
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

    static toDomain(value: PrismaOrderExtended): Order {
        return Order.rehydrate({
            ...value,
            patientId: value.clientId,
            externalKeys: value.externalKeys.map(e => OrderExternalKey.create({ ...e }))
        });
    }
}