import { PartialType } from "@nestjs/mapped-types";
import { BaseDiseaseGroupRequestDto } from "./disease-group.base.request.dto";

export class PatchDiseaseGroupRequestDto extends PartialType(BaseDiseaseGroupRequestDto) { }