import { OmitType } from "@nestjs/mapped-types";
import { UserAttributeRequestDto } from "./base.user-attribute.request.dto";

export class PatchUserExtraAttributeRequestDto extends OmitType(UserAttributeRequestDto, ['name']) { }