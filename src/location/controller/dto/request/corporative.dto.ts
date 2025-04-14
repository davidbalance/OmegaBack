import { CorporativeCreateCommandPayload } from "@omega/location/application/command/corporative/corporative-create.command";
import { IsNotEmpty, IsString } from "class-validator";

export class CorporativeCreateRequestDto implements CorporativeCreateCommandPayload {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}