import { TestOrderExternal } from "@omega/medical/application/service/create-many-test-from-external-source.service";
import { Expose, Type } from "class-transformer";

export class TestExternalResponseDto {
    @Expose() public readonly testId: string;
    @Expose() public readonly testExternalKey: string;
    @Expose() public readonly testExternalOwner: string;
}

export class TestOrderExternalResponseDto implements TestOrderExternal {
    @Expose() public readonly patientDni: string;
    @Expose() public readonly orderId: string;
    @Expose() public readonly orderExternalKey: string;
    @Expose() public readonly orderExternalOwner: string;

    @Type(() => TestExternalResponseDto)
    @Expose() public readonly tests: TestExternalResponseDto[];
}