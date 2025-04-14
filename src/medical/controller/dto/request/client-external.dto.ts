import { ApiProperty } from "@nestjs/swagger";
import { CreatePatientFromExternalSourcePayload } from "@omega/medical/application/service/create-patient-from-external-source.service";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreatePatientFromExternalSourceDto implements Omit<CreatePatientFromExternalSourcePayload, 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly patientDni: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientName: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientLastname: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientEmail: string;

    @ApiProperty({ enum: { male: 'male', female: 'female', } })
    @IsEnum({ male: 'male', female: 'female', })
    public readonly patientGender: "male" | "female";

    @IsDate()
    @Type(() => Date)
    public readonly patientBirthday: Date;
}