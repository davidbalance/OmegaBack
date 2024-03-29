export type AccessToken = {
    sub: number;
    iat?: number;
}

export type RefreshToken = {
    sub: number;
    token: string;
    iat?: number;
}