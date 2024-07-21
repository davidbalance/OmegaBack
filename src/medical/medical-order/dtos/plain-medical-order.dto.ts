import { GETMedicalEmailResponseDto } from "@/medical/medical-client/dtos/medical-email.response.dto";
import { GETMedicalResultResponseDto } from "@/medical/medical-result/dtos/get.medical-result.dto";
import { Expose, Type } from "class-transformer";

export class PlainMedicalOrder {
    @Expose() public readonly id: number;

    @Expose() public readonly process: string;

    @Expose() public readonly createAt: Date;

    @Expose() public readonly mailStatus?: boolean;

    @Expose() public readonly orderStatus: string;

    @Expose() public readonly dni: string;

    @Expose() public readonly fullname: string;

    @Type(() => GETMedicalEmailResponseDto)
    @Expose() public readonly email: GETMedicalEmailResponseDto[];

    @Type(() => GETMedicalResultResponseDto)
    @Expose() public readonly results: GETMedicalResultResponseDto[]
}

export class PlainMedicalOrderResponse extends PlainMedicalOrder { }