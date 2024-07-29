import { IsNotEmpty, IsString } from "class-validator";
import { BranchResponseDto } from "./branch.dto";

export class PATCHBranchRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHBranchResponseDto extends BranchResponseDto { }