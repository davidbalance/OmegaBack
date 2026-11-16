import { IsNotEmptyObject, IsObject } from "class-validator";

export class RecordRequestDTO {
    @IsObject()
    @IsNotEmptyObject()
    public readonly metadata: any;
}