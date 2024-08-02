import { IsNotEmpty, IsString } from 'class-validator';

export class PatchJobPositionRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}