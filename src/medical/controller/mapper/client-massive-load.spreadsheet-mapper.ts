import { plainToInstance } from "class-transformer";
import { ClientCreateRequestDto } from "../dto/request/client.dto";

export class ClientMassiveLoadSpreadSheetMapper {

    public static toDTO(value: [string, string, string, string, string, string, Date]): ClientCreateRequestDto {
        return plainToInstance(ClientCreateRequestDto, {
            patientDni: value[0],
            patientName: value[1],
            patientLastname: value[2],
            patientEmail: value[3],
            patientGender: value[4].toLocaleLowerCase() === 'masculino' ? 'male' : 'female',
            patientRole: value[5] === '' ? undefined : value[5],
            patientBirthday: value[6]
        });
    }
}