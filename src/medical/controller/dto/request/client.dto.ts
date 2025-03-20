import { ClientAddAreaCommandPayload } from "@omega/medical/application/commands/client/client-add-area.command";
import { ClientAddJobPositionCommandPayload } from "@omega/medical/application/commands/client/client-add-job-position.command";
import { ClientAddManagementCommandPayload } from "@omega/medical/application/commands/client/client-add-management.command";
import { ClientCreateCommandPayload } from "@omega/medical/application/commands/client/client-create.command";
import { ClientEditCommand, ClientEditCommandPayload } from "@omega/medical/application/commands/client/client-edit.command";
import { EmailCreateCommandPayload } from "@omega/medical/application/commands/client/email-create.command";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class ClientAddAreaRequestDto implements Omit<ClientAddAreaCommandPayload, 'patientDni'> {
    @IsUUID()
    public readonly areaId: string;

    @IsString()
    @IsNotEmpty()
    public readonly areaName: string;
}

export class ClientAddJobPositionRequestDto implements Omit<ClientAddJobPositionCommandPayload, 'patientDni'> {
    @IsString()
    @IsNotEmpty()
    public readonly jobPositionName: string;
}

export class ClientAddManagementRequestDto implements Omit<ClientAddManagementCommandPayload, 'patientDni'> {
    @IsUUID()
    public readonly managementId: string;

    @IsString()
    @IsNotEmpty()
    public readonly managementName: string;
}

export class ClientChangeRoleRequestDto implements Pick<ClientEditCommandPayload, 'patientRole'> {
    @IsString()
    @IsNotEmpty()
    public readonly patientRole: string;
}

export class ClientCreateRequestDto implements ClientCreateCommandPayload {
    @IsEmail()
    public readonly patientEmail: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientName: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientLastname: string;

    @IsString()
    @IsOptional()
    public readonly patientRole?: string;

    @IsEnum({ male: 'male', female: 'female' })
    public readonly patientGender: "male" | "female";

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    public readonly patientBirthday: Date;

    @IsString()
    @IsNotEmpty()
    @Length(10)
    public readonly patientDni: string;
}

export class ClientEmailCreateRequestDto implements EmailCreateCommandPayload {
    @IsString()
    @IsNotEmpty()
    @Length(10)
    public readonly patientDni: string;

    @IsEmail()
    public readonly email: string;
}