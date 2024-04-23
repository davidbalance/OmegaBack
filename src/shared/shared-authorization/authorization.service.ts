import { ClaimEnum } from "../enums";

export abstract class AuthorizationService {
    /**
     * Compare the given permissions and the ones that have a user
     * @param user 
     * @param claim 
     * @param resources 
     */
    abstract canAccess(user: number, claim: ClaimEnum, resources: string[]): Promise<boolean> | boolean;
}