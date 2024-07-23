import { MedicalEmailResponseDto } from "./base.medical-email.response.dto";
import { OmitType } from "@nestjs/mapped-types";

export class PostMedicalEmailResponseDto extends OmitType(MedicalEmailResponseDto, ['id', 'default']) { }