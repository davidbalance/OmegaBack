import { plainToInstance } from "class-transformer";
import { ClientCreateRequestDto } from "../dto/request/client.dto";
import { BadRequestException } from "@nestjs/common";

export class ClientMassiveLoadSpreadSheetMapper {

    public static toDTO(value: unknown[]): ClientCreateRequestDto {
        if (value.length < 7) throw new BadRequestException('Not enough values');


        return plainToInstance(ClientCreateRequestDto, {
            patientDni: this.validateDni(value[0]),
            patientName: value[1],
            patientLastname: value[2],
            patientEmail: value[3],
            patientGender: this.validateGender(value[4]),
            patientRole: value[5] === '' ? undefined : value[5],
            patientBirthday: this.validateDate(value[6])
        });
    }

    public static validateDni(value: unknown): string {
        if (typeof value === 'number') {
            return value.toString().padStart(10, '0');
        } else if (typeof value === 'string') {
            return value;
        }
        throw new BadRequestException('Invalid dni');
    }

    public static validateGender(value: unknown): string {
        if (typeof value === 'string') {
            return value.toLocaleLowerCase() === 'masculino' ? 'male' : 'female';
        }
        throw new BadRequestException('Invalid gender');
    }

    public static validateDate(value: unknown): Date {
        if (typeof value === 'string') {
            return new Date(value)
        } else if (typeof value === 'object' && !!(value as { result?: string }).result) {
            return new Date((value as any).result)
        } else if (value instanceof Date) {
            return value;
        }
        throw new BadRequestException('Invalid Date');
    }
}