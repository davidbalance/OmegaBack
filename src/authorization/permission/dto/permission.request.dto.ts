import { AuthorizationType } from "../enums";

export class CreatePermissionRequestDTO {
    public readonly name: string;
    public readonly route: string;
    public readonly type: AuthorizationType;
    public readonly app?: string;
}