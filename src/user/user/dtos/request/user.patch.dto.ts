import { OmitType, PartialType } from "@nestjs/mapped-types";
import { UserRequestDto } from "./user.base.dto";

export class PatchUserRequestDto extends PartialType(OmitType(UserRequestDto, ['dni', 'email'])) { }
