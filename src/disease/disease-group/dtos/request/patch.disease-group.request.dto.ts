import { PartialType } from "@nestjs/mapped-types";
import { PostDiseaseGroupRequestDto } from "./post.disease-group.request.dto";

export class PatchDiseaseGroupRequestDto extends PartialType(PostDiseaseGroupRequestDto) { }