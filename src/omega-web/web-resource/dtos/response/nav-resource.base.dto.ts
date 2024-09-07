import { Expose } from 'class-transformer';

export class NavResource {
    @Expose() public readonly id: number;
    @Expose() public readonly label: string;
}