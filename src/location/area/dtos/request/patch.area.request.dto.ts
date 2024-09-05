import { PostAreaRequestDto } from "./post.area.request.dto";
import { PartialType } from "@nestjs/mapped-types";

export class PatchAreaRequestDto extends PartialType(PostAreaRequestDto) { }