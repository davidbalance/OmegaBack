import { OmitType } from "@nestjs/mapped-types";
import { UserAttributeRequestDto } from "./user-attribute.base.dto";

export class PatchUserExtraAttributeRequestDto extends OmitType(UserAttributeRequestDto, ['name']) { }