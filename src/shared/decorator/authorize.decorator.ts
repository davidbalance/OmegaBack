import { SetMetadata } from "@nestjs/common";
import { ClaimEnum } from "../enums";

export type AuthorizeDecoratorParam = {
    type: ClaimEnum;
    resources: string[];
};

export const AuthorizeDecoratorKey = "authorize";

/**
 * Decorator to set the authorization values that will be manage by the AuthorizationGuard
 * @param type 
 * @param resources 
 * @returns 
 */
export const Authorize = (type: ClaimEnum, ...resources: string[]) => SetMetadata<string, AuthorizeDecoratorParam>(AuthorizeDecoratorKey, { type, resources });