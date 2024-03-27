import { PartialType } from "@nestjs/mapped-types";

export class CreateMorbidityRequestDTO {
    public readonly name: string;
    public readonly group: number;
}

export class UpdateMorbidityRequestDTO extends PartialType(CreateMorbidityRequestDTO) { }