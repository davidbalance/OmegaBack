import { FlatService } from "@/shared/utils/bases/base.flat-service";
import { Injectable } from "@nestjs/common";
import { MedicalOrder } from "../entities/medical-order.entity";
import { MedicalOrderFlatResponseDto } from "../dtos/response/base.medical-order-flat.response.dto";

@Injectable()
export class MedicalOrderFlatService implements FlatService<MedicalOrder, MedicalOrderFlatResponseDto> {
    public flat({ client, results, ...order }: MedicalOrder): MedicalOrderFlatResponseDto {
        const { dni, name, lastname } = client;
        const { branchName, corporativeName, externalKey, updateAt, ...values } = order;
        return { dni, name, lastname, ...values }
    }
}