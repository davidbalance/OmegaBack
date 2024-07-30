import { Expose, Type } from "class-transformer";
import { MedicalEmailResponseDto } from "./base.medical-email.response.dto";

export class MedicalClientResponseDto {

    @Expose() public readonly dni: string;
    @Expose() public readonly name: string;
    @Expose() public readonly lastname: string;
    @Expose() public readonly managementId: number;
    @Expose() public readonly areaId: number;

    @Type(() => MedicalEmailResponseDto)
    @Expose() public readonly email: MedicalEmailResponseDto[];
}