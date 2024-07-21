import { GETMedicalClientResponseDto } from "@/medical/medical-client/dtos/medical-client.response.dto";
import { GETMedicalResultResponseDto } from "@/medical/medical-result/dtos/get.medical-result.dto";
import { Expose, Type } from "class-transformer";

export class MedicalOrderResponse {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly process: string;

    @Expose()
    public readonly createAt: Date;

    @Expose()
    public readonly mailStatus?: boolean;

    @Expose()
    public readonly orderStatus: string;

    @Type(() => GETMedicalClientResponseDto)
    @Expose()
    public readonly client: GETMedicalClientResponseDto;

    @Type(() => GETMedicalResultResponseDto)
    @Expose()
    public readonly results: GETMedicalResultResponseDto[]
}