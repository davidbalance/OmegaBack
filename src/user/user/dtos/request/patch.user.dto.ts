import { OmitType, PartialType } from "@nestjs/mapped-types";
import { UserRequestDto } from "./base.user.request.dto";

export class PatchUserRequestDto extends PartialType(OmitType(UserRequestDto, ['dni', 'email'])) { }
