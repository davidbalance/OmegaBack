import { IsNotEmpty, IsString } from 'class-validator';
import { JobPositionResponseDto } from './job-position.dto';

export class PATCHJobPositionRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}


export class PATCHJobPositionResponseDto extends JobPositionResponseDto { }