import { Expose } from "class-transformer";

export class ResourceResponseDto {
    @Expose() public readonly resourceId: string;
    @Expose() public readonly resourceLabel: string;
    @Expose() public readonly resourceAddress: string;
    @Expose() public readonly resourceIcon: string;
}