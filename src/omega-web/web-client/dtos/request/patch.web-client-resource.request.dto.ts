import { OmitType } from "@nestjs/mapped-types";
import { WebClientRequestDto } from "./base.web-client.request.dto";

export class PatchWebClientResourceRequestDto extends OmitType(WebClientRequestDto, ['user', 'logo']) { }