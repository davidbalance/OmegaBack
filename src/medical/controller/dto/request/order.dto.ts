import { OrderCreateCommandPayload } from "@omega/medical/application/commands/order/order-create.command";
import { OrderSendMailCommandPayload } from "@omega/medical/application/commands/order/order-send-mail.command";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, Length, Min } from "class-validator";

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