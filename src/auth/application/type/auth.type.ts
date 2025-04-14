export type AuthJwtPayload = {
    sub: string;
    email: string;
    name: string;
    lastname: string;
    logo: string | null;
    resources: {
        label: string;
        address: string;
        icon: string;
    }[]
}

export type RefreshJwtPayload = {
    sub: string;
    token: string;
}

export type AuthIntrospect = Partial<AuthJwtPayload> & {
    active: boolean;
}