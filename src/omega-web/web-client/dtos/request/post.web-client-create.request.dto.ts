import { OmitType } from "@nestjs/mapped-types";
import { WebClientRequestDto } from "./base.web-client.request.dto";

export class PostWebClientCreateRequestDto extends OmitType(WebClientRequestDto, ['logo', 'resources']) { }
