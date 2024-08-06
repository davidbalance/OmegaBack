import { UserRequestDto } from "@/user/user/dtos/request/base.user.request.dto";
import { OmitType } from "@nestjs/mapped-types";

export class DoctorRequestDto extends OmitType(UserRequestDto, ['role']) { }