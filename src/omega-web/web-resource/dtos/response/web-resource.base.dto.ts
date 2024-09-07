import { Expose } from 'class-transformer';

export class WebResource {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly label: string;
    @Expose() public readonly address: string;
    @Expose() public readonly icon: string;
    @Expose() public readonly status: boolean;
}