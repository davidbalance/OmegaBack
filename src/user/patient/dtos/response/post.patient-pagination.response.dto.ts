import { PaginationResponse } from "@/shared/utils/bases/base.pagination";
import { Expose, Type } from "class-transformer";
import { PatientResponseDto } from "./base.patient.response.dto";

export class PostPatientPaginationResponseDto implements PaginationResponse<PatientResponseDto> {
    @Expose() public readonly pages: number;

    @Type(() => PatientResponseDto)
    @Expose() public readonly data: PatientResponseDto[];
}