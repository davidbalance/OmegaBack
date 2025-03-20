import { OrderCreateCommandPayload } from "@omega/medical/application/commands/order/order-create.command";
import { OrderSendMailCommandPayload } from "@omega/medical/application/commands/order/order-send-mail.command";
import { TestCreateCommandPayload } from "@omega/medical/application/commands/test/test-create.command";
import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";

export class OrderCreateRequestDto implements OrderCreateCommandPayload {
    @IsString()
    @IsNotEmpty()
    public readonly patientDni: string;

    @IsString()
    @IsNotEmpty()
    public readonly corporativeName: string;

    @IsString()
    @IsNotEmpty()
    @Length(13)
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
    public readonly process: string;

    @IsNumber()
    @Min(1900)
    public readonly year: number;
}

export class OrderSendEmailRequestDto implements OrderSendMailCommandPayload {
    @IsUUID()
    public readonly orderId: string;

    @IsEmail()
    public readonly email: string;
}

export class OrderMassiveLoadRequestDto implements OrderCreateCommandPayload, Omit<TestCreateCommandPayload, 'orderId'> {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly patientDni: string;

    @IsString()
    @IsNotEmpty()
    public readonly corporativeName: string;

    @IsString()
    @IsNotEmpty()
    @Length(13)
    public readonly companyRuc: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly branchName: string;

    @IsOptional()
    @IsString()
    @Length(10, 10)
    @Transform(({ value }) => !!value ? value : '0000000000')
    public readonly doctorDni: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => !!value ? value : 'NO ESPECIFICA')
    public readonly doctorFullname: string;

    @IsString()
    @IsNotEmpty()
    public readonly process: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1900)
    public readonly year: number;

    @IsString()
    @IsNotEmpty()
    public readonly examName: string;

    @IsString()
    @IsNotEmpty()
    public readonly examSubtype: string;

    @IsString()
    @IsNotEmpty()
    public readonly examType: string;
}