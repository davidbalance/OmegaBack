import { CreateOrderFromExternalSourcePayload } from "@omega/medical/application/service/create-order-from-external-source.service";
import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { CreatePatientFromExternalSourceDto } from "./client-external.dto";

export class CreateOrderFromExternalSourceDto
    extends CreatePatientFromExternalSourceDto
    implements Omit<CreateOrderFromExternalSourcePayload, 'owner'> {

    @IsString()
    @IsNotEmpty()
    public readonly corporativeName: string;

    @IsString()
    @IsNotEmpty()
    @Length(13, 13)
    public readonly companyRuc: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly branchName: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly doctorDni: string;

    @IsString()
    @IsNotEmpty()
    public readonly doctorFullname: string;

    @IsString()
    @IsNotEmpty()
    public readonly orderKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly orderProcess: string;

    @IsNumber()
    @Min(1900)
    public readonly orderYear: number;
}