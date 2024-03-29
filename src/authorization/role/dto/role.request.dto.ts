import { PartialType } from "@nestjs/mapped-types";

export class CreateRoleRequestDTO {
    public name: string;
    public resources: number[];
}

export class FindOneRoleAndUpdateRequestDTO extends PartialType(CreateRoleRequestDTO) { }