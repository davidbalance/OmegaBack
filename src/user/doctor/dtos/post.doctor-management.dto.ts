import { POSTUserRequestDto } from "@/user/user/dtos/post.user-management.dto";
import { GETDoctorResponseDto } from "./get.doctor-management.dto";

export class POSTDoctorRequestDto extends POSTUserRequestDto { }

export class POSTDoctorResponseDto extends GETDoctorResponseDto { }