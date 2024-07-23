import { Expose } from 'class-transformer';

export class NavResourceResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly label: string;
}