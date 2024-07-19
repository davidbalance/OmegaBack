import { IsNotEmpty, IsString } from "class-validator";
import { CorporativeGroupResponseDto } from "./corporative-group.dto";

export class PATCHCorporativeGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHCorporativeGroupResponseDto extends CorporativeGroupResponseDto { }