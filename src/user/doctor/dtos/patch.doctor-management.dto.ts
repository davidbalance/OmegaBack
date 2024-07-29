import { PATCHUserRequestDto } from "@/user/user/dtos/patch.user-management.dto";
import { GETDoctorResponseDto } from "./get.doctor-management.dto";

export class PATCHDoctorRequestDto extends PATCHUserRequestDto { }

export class PATCHDoctorResponseDto extends GETDoctorResponseDto { }