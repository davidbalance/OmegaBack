import { PaginationResponse } from "@/shared/utils/bases/base.pagination";
import { Expose, Type } from "class-transformer";
import { PatientEeqResponseDto } from "./base.patient-eeq.response.dto";

export class PostPatientEeqPaginationResponseDto implements PaginationResponse<PatientEeqResponseDto> {
    @Expose() public readonly pages: number;

    @Type(() => PatientEeqResponseDto)
    @Expose() public readonly data: PatientEeqResponseDto[];
}