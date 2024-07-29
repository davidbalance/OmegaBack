import { PaginationRequest, PaginationResponse } from "@/shared/utils/bases/base.pagination";
import { FlatEEQPatientResponseDto } from "./patient.dto";

export class GETEeqPatientPaginationResponseDto extends PaginationResponse<FlatEEQPatientResponseDto> { }

export class GETEeqPatientPaginationRequestDto extends PaginationRequest { }