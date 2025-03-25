import { plainToInstance } from "class-transformer";
import { OrderMassiveLoadRequestDto } from "../dto/request/order.dto";

export class OrderMassiveLoadSpreadSheetMapper {

    public static toDTO(value: [string, string, string, string, string, string, string, string, number, string, string, string]): OrderMassiveLoadRequestDto {
        return plainToInstance(OrderMassiveLoadRequestDto, {
            patientDni: value[0],
            corporativeName: value[1],
            companyRuc: typeof value[2] !== 'string' ? `${value[2]}` : value[2],
            companyName: value[3],
            branchName: value[4],
            doctorDni: value[5],
            doctorFullname: value[6],
            process: value[7],
            year: value[8],
            examName: value[9],
            examSubtype: value[10],
            examType: value[11],
        });
    }
}