import { Expose } from "class-transformer";

export class GetMedicalOrderStatusResponseDto {
    @Expose() public readonly orderStatus: string;
}