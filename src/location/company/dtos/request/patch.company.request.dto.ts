import { OmitType } from "@nestjs/mapped-types";
import { PostCompanyRequestDto } from "./post.company.request.dto";

export class PatchCompanyRequestDto extends OmitType(PostCompanyRequestDto, ['corporativeGroup', 'ruc']) { }