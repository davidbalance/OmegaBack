import { OmitType } from "@nestjs/mapped-types";
import { PostBranchRequestDto } from "./post.branch.request.dto";

export class PatchBranchRequestDto extends OmitType(PostBranchRequestDto, ['company', 'city']) { }