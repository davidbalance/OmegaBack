export interface JwtProvider {
    createJwt<T extends object>(payload: T): string;
    validateJwt<T>(jwt: string): T;
}