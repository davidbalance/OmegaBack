import { Expose } from "class-transformer";

export class TestExternalResponseDto {
    @Expose() public readonly testId: string;
    @Expose() public readonly testExternalKey: string;
    @Expose() public readonly testExternalOwner: string;
}