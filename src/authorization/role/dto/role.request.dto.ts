export class CreateRoleRequestDTO {
    public name: string;
    public permissions: number[];
}

export class UpdateRoleRequestDTO {
    public name: string;
}

export class UpdateRolePermissionsRequestDTO {
    public permissions: number[];
}