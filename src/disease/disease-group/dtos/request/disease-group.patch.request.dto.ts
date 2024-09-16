import { PartialType } from "@nestjs/mapped-types";
import { DiseaseGroupRequestDto } from "./disease-group.base.request.dto";

export class PatchDiseaseGroupRequestDto extends PartialType(DiseaseGroupRequestDto) { }