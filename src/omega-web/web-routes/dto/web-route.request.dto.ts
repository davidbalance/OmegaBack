import { PartialType } from "@nestjs/mapped-types";

export class CreateWebRouteRequestDTO {
    public readonly link: string;
    public readonly label: string;
    public readonly icon?: string;
}

export class UpdateWebRouteRequestDTO extends PartialType(CreateWebRouteRequestDTO) { }