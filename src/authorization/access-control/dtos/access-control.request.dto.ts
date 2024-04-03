import { IsArray, IsNotEmpty } from "class-validator";

export class FindOneACClientAndUpdateRolesRequestDTO {
    @IsArray()
    @IsNotEmpty()
    public readonly roles: number[];
}

export class FindOneACClientAndUpdateResourcesRequestDTO {
    @IsArray()
    @IsNotEmpty()
    public readonly resources: number[];
}