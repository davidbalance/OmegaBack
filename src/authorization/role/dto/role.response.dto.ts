import { ClaimEnum } from "@/shared";
import { Expose, Type } from "class-transformer";

class RoleResourceDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly claim: string;
}

export class FindRoleResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => RoleResourceDTO)
    @Expose()
    public readonly resources: RoleResourceDTO[];
}

export class FindRolesResponseDTO {
    @Type(() => FindRoleResponseDTO)
    @Expose()
    public readonly roles: FindRoleResponseDTO[];
}

export class CreateRoleResponseDTO { }

export class FindOneRoleAndUpdateResponseDTO { }

export class FindOneRoleAndDeleteResponseDTO { }