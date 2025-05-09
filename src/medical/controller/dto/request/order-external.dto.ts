import { CreateOrderFromExternalSourcePayload } from "@omega/medical/application/service/create-order-from-external-source.service";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, Min } from "class-validator";
import { CreatePatientFromExternalSourceDto } from "./client-external.dto";
import { Transform } from "class-transformer";

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
    @MaxLength(64)
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly branchName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly doctorDni: string = '0000000000';

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly doctorFullname: string = 'NO ESPECIFICO';

    @IsString()
    @IsNotEmpty()
    public readonly orderKey: string;

    @Transform(({ value }) => {
        const newValue = (value as string)
            .toLowerCase()
            .split(/[ -]/)
            .map(e => `${e[0].toUpperCase()}${e.slice(1)}`)
            .join("-")
        if (newValue === 'Consulta-Externa') return "Consulta Externa";
        return newValue;
    })
    @IsEnum({
        postOcupacional: "Post-Ocupacional",
        periodico: "Periodico",
        preOcupacional: "Pre-Ocupacional",
        especial: "Especial",
        consultaExterna: "Consulta Externa",
    })
    public readonly orderProcess: string;

    @IsNumber()
    @Min(1900)
    public readonly orderYear: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly branchKey?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly companyKey?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly corporativeKey?: string | undefined;
}