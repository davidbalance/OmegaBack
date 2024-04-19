import { ClaimEnum } from "../enums";

export abstract class AuthorizationService {
    abstract canAccess(user: number, claim: ClaimEnum, resources: string[]): Promise<boolean> | boolean;
}