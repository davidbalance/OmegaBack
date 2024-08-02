export interface RefreshToken {
    sub: number;
    token: string;
    iat?: number;
}