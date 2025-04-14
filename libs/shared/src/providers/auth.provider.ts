export type CreateAuthPayload = {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export type AuthPayload = {
    id: string;
    name: string;
    lastname: string;
    dni: string;
    email: string;
}

export type AuthResourcePayload = {
    authId: string;
    resources: string[];
}

export type AuthResource = {
    resourceId: string;
    resourceLabel: string;
    resourceIcon?: string;
}

export interface AuthProvider {
    createAuth(value: CreateAuthPayload): Promise<string>;
    retriveResources(authId: string): Promise<AuthResource[]>;
    addResources(value: AuthResourcePayload): Promise<void>;
    addLogo(authId: string, logoId: string): Promise<void>;
    validateJwt(jwt: string): Promise<AuthPayload>;
}