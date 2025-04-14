import { CreateExamTypeFromExternalSourcePayload } from "@omega/laboratory/application/service/create-exam-type-from-external-source.service";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateExamTypeExternalRequestDto implements Omit<CreateExamTypeFromExternalSourcePayload, 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly typeKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly typeName: string;
}