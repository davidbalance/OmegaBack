import { PaginationRequest, PaginationResponse } from "@/shared/utils/bases/base.pagination";
import { FlatEEQPatientResponseDto } from "./patient.dto";
import { Expose, Type } from "class-transformer";

export class GETEeqPatientPaginationResponseDto implements PaginationResponse<FlatEEQPatientResponseDto> {
    @Expose()
    public readonly pages: number;

    @Expose()
    @Type(() => FlatEEQPatientResponseDto)
    public readonly data: FlatEEQPatientResponseDto[];
}

export class GETEeqPatientPaginationRequestDto extends PaginationRequest { }