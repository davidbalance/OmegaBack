import { CreateExamFromExternalSourcePayload } from "@omega/laboratory/application/service/create-exam-from-external-source.service";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateExamExternalRequestDto implements Omit<CreateExamFromExternalSourcePayload, 'owner'> {
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

    @IsString()
    @IsNotEmpty()
    public readonly examKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly examName: string;
}