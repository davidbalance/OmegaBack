import { PaginationRequest, PaginationResponse } from "@/shared/utils/bases/base.pagination";
import { Expose, Type } from "class-transformer";

export class GETPatientPaginationResponseDto implements PaginationResponse<GETPatientPaginationResponseDto> {
    @Expose()
    public readonly pages: number;

    @Expose()
    @Type(() => GETPatientPaginationResponseDto)
    public readonly data: GETPatientPaginationResponseDto[];
}

export class GETPatientPaginationRequestDto extends PaginationRequest { }