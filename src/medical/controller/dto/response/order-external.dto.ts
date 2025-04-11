import { Expose } from "class-transformer";

export class OrderExternalResponseDto {
    @Expose() public readonly orderId: string;
    @Expose() public readonly orderExternalKey: string;
    @Expose() public readonly orderExternalOwner: string;
    @Expose() public readonly patientDni: string;
}
