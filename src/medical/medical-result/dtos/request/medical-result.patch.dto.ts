import { MedicalResultRequestDto } from "./medical-result.base.dto";
import { OmitType } from "@nestjs/mapped-types";

export class PatchMedicalResultRequestDto extends OmitType(MedicalResultRequestDto, ['doctorDni', 'doctorFullname', 'order']) { }