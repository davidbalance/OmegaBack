import { GETMedicalEmailResponseDto } from "@/medical/medical-client/dtos/medical-email.response.dto";
import { MedicalResultResponseDto } from "@/medical/medical-result/dtos/response/base.medical-result.response.dto";
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

    @Type(() => MedicalResultResponseDto)
    @Expose() public readonly results: MedicalResultResponseDto[]
}

export class PlainMedicalOrderResponse extends PlainMedicalOrder { }