import { IsString } from "class-validator";

export class PATCHUserExtraAttributeRequestDto {
    @IsString()
    public readonly value: string;
}

export class PATCHUserExtraAttributeResponseDto { }