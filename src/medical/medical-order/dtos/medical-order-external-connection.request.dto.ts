import { IsNotEmpty, IsString } from "class-validator";
import { POSTMedicalOrderRequestDto } from "./medical-order.request.dto";

export class POSTMedicalOrderExternalConnectionRequestDto extends POSTMedicalOrderRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}

export class PATCHMedicalOrderProcessRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly process: string;
}