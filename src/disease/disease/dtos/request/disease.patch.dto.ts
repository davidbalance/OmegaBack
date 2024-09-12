import { PartialType } from "@nestjs/mapped-types";
import { PostDiseaseRequestDto } from "./disease.post.dto";

export class PatchDiseaseRequestDto extends PartialType(PostDiseaseRequestDto) { }