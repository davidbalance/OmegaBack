import { PartialType } from "@nestjs/mapped-types";
import { PostDiseaseRequestDto } from "./post.disease.request.dto";

export class PatchDiseaseRequestDto extends PartialType(PostDiseaseRequestDto) { }