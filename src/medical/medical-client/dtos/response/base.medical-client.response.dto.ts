import { Expose, Type } from "class-transformer";
import { MedicalEmailResponseDto } from "./base.medical-email.response.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class MedicalClientResponseDto {

    @Expose() public readonly dni: string;
    @Expose() public readonly fullname: string;
    @Expose() public readonly managementId: number;
    @Expose() public readonly areaId: number;

    @Type(() => MedicalEmailResponseDto)
    @Expose() public readonly email: MedicalEmailResponseDto[];
}