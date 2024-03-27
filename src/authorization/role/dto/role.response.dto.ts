import { Role } from "../entities/role.entity";

export class FindRolesResponseDTO {
    public readonly roles: Role[];
}

export class CreateRoleResponseDTO { }

export class FindOneAndUpdateRoleResponseDTO { }

export class FindOneAndInactiveRoleResponseDTO { }