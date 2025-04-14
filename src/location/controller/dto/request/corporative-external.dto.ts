import { CreateCorporativeFromExternalSourcePayload } from "@omega/location/application/service/create-corporative-from-external-source.service";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCorporativeFromExternalRequestDto implements Omit<CreateCorporativeFromExternalSourcePayload, 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly corporativeKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly corporativeName: string;
}