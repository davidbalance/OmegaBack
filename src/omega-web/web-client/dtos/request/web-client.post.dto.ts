import { OmitType } from "@nestjs/mapped-types";
import { WebClientRequestDto } from "./web-client.base.dto";

export class PostWebClientCreateRequestDto extends OmitType(WebClientRequestDto, ['logo', 'resources']) { }
