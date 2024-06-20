import { Expose, Type } from 'class-transformer';

export class FindWebResourceResponseDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly label: string;
}

export class FindAllWebResourceResponseDto {
    @Type(() => FindWebResourceResponseDto)
    @Expose()
    public readonly resources: FindWebResourceResponseDto[];
}