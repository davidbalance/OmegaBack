import { Expose } from "class-transformer";
import { MedicalReportResponse } from "./medical-report.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";

export class GETMedicalReportResponseDto extends MedicalReportResponse { }

export class POSTMedicalReportResponseDto extends ObjectArrayResponse<GETMedicalReportResponseDto> { }