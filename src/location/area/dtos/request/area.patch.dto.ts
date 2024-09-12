import { AreaRequestDto } from "./area.base.dto";
import { PartialType } from "@nestjs/mapped-types";

export class PatchAreaRequestDto extends PartialType(AreaRequestDto) { }