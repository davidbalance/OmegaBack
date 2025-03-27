import { plainToInstance } from "class-transformer";
import { OrderMassiveLoadRequestDto } from "../dto/request/order.dto";
import { BadRequestException } from "@nestjs/common";

export class OrderMassiveLoadSpreadSheetMapper {

    public static toDTO(value: unknown[], types: string[], subtypes: string[], exams: string[]): OrderMassiveLoadRequestDto {
        if (value.length < 12) throw new BadRequestException('Not enough values.');
        if (types.length !== subtypes.length && types.length !== exams.length) throw new BadRequestException('Not valid exams.');

        const newTests = value.slice(9).map((e, i) => !!e && typeof e === 'string' && e.trim() !== '' ? ({
            examType: types[i],
            examSubtype: subtypes[i],
            examName: exams[i],
        }) : null).filter(e => !!e);

        return plainToInstance(OrderMassiveLoadRequestDto, {
            patientDni: this.validateDni(value[0]),
            corporativeName: value[1],
            companyRuc: this.validateRuc(value[2]),
            companyName: value[3],
            branchName: value[4],
            doctorDni: this.validateDni(value[5]),
            doctorFullname: value[6],
            process: value[7],
            year: value[8],
            tests: newTests
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

    public static validateRuc(value: unknown): string {
        if (typeof value === 'number') {
            return value.toString().padStart(13, '0');
        } else if (typeof value === 'string') {
            return value;
        }
        throw new BadRequestException('Invalid ruc');
    }
}