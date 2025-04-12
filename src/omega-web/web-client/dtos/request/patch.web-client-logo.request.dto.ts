import { OmitType } from "@nestjs/mapped-types";
import { WebClientRequestDto } from "./base.web-client.request.dto";

export class PatchWebClientLogoRequestDto extends OmitType(WebClientRequestDto, ['user', 'resources']) { }
