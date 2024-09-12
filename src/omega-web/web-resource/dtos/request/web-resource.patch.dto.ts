import { PartialType } from "@nestjs/mapped-types";
import { WebResourceRequestDto } from "./web-resource.base.dto";

export class PatchWebResourceRequestDto extends PartialType(WebResourceRequestDto) { }