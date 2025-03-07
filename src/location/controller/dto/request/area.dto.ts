import { AreaCreateCommandPayload } from "@omega/location/application/command/area/area-create.command";
import { AreaEditCommandPayload } from "@omega/location/application/command/area/area-edit.command";
import { IsNotEmpty, IsString } from "class-validator";

export class AreaCreateRequestDto implements AreaCreateCommandPayload {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class AreaEditRequestDto implements Omit<AreaEditCommandPayload, 'areaId'> {
    @IsString()
    @IsNotEmpty()
    public readonly areaName: string;
}