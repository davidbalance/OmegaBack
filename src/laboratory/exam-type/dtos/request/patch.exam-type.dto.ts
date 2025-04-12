import { IsNotEmpty, IsString } from 'class-validator';

export class PatchExamTypeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}