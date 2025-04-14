import { CreateExamSubtypeFromExternalSourcePayload } from "@omega/laboratory/application/service/create-exam-subtype-from-external-source.service";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateExamSubtypeExternalRequestDto implements Omit<CreateExamSubtypeFromExternalSourcePayload, 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly typeKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly typeName: string;

    @IsString()
    @IsNotEmpty()
    public readonly subtypeKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly subtypeName: string;
}