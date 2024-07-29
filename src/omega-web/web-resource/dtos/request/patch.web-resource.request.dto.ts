import { PartialType } from "@nestjs/mapped-types";
import { PostWebResourceRequestDto } from "./post.web-resource.request.dto";

export class PatchWebResourceRequestDto extends PartialType(PostWebResourceRequestDto) { }