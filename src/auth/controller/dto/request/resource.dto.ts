import { ResourceCreateCommandPayload } from "@omega/auth/application/command/resource/resource-create.command";
import { ResourceEditCommandPayload } from "@omega/auth/application/command/resource/resource-edit.command";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ResourceCreateRequestDto implements ResourceCreateCommandPayload {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly order: number;

    @IsString()
    @IsNotEmpty()
    public readonly label: string;

    @IsString()
    @IsNotEmpty()
    public readonly address: string;

    @IsString()
    @IsNotEmpty()
    public readonly icon: string;
}

export class ResourceEditRequestDto implements Omit<ResourceEditCommandPayload, 'resourceId'> {
    @IsString()
    @IsOptional()
    public readonly label?: string;

    @IsString()
    @IsOptional()
    public readonly address?: string;

    @IsString()
    @IsOptional()
    public readonly icon?: string;

}