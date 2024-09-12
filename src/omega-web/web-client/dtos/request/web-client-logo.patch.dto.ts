import { OmitType } from "@nestjs/mapped-types";
import { WebClientRequestDto } from "./web-client.base.dto";

export class PatchWebClientLogoRequestDto extends OmitType(WebClientRequestDto, ['user', 'resources']) { }
