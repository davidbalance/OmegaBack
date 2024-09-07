import { OmitType } from "@nestjs/mapped-types";
import { ExternalBranchRequestDto } from "./external-branch.base.dto";

export class PatchBranchExternalRequestDto extends OmitType(ExternalBranchRequestDto, ['company', 'city']) { }