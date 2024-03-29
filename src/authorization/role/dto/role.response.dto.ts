import { ClaimEnum } from "@/shared";
import { Role } from "../entities/role.entity";

export class FindRole {
    public readonly id: number;
    public readonly name: string;
    public readonly resources: {
        id: number;
        name: string;
        claim: ClaimEnum
    }[];
}

export class FindRolesResponseDTO {
    public readonly roles: FindRole[];
}

export class CreateRoleResponseDTO { }

export class FindOneRoleAndUpdateResponseDTO { }

export class FindOneRoleAndDeleteResponseDTO { }