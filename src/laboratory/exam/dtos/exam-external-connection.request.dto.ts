import { IsNotEmpty, IsString } from "class-validator";

export class CreateExamExternalRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}


export class FindOneExamExternalAndUpdateRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}