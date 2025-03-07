import { ManagementCreateCommandPayload } from "@omega/location/application/command/management/management-create.command";
import { ManagementEditCommandPayload } from "@omega/location/application/command/management/management-edit.command";
import { IsNotEmpty, IsString } from "class-validator";

export class ManagementCreateRequestDto implements ManagementCreateCommandPayload {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class ManagementEditRequestDto implements Omit<ManagementEditCommandPayload, 'managementId'> {
    @IsString()
    @IsNotEmpty()
    public readonly managementName: string;
}