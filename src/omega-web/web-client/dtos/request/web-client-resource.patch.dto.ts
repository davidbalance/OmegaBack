import { OmitType } from "@nestjs/mapped-types";
import { WebClientRequestDto } from "./web-client.base.dto";

export class PatchWebClientResourceRequestDto extends OmitType(WebClientRequestDto, ['user', 'logo']) { }