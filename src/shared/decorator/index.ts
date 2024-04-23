import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { ClaimEnum } from "../enums";


/**
 * Gets the user from the request header
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<Request>().user);

export type AuthorizeDecoratorParam = { type: ClaimEnum, resources: string[] };
export const AuthorizeDecoratorKey = "authorize";

/**
 * Decorator to set the authorization values that will be manage by the AuthorizationGuard
 * @param type 
 * @param resources 
 * @returns 
 */
export const Authorize = (type: ClaimEnum, ...resources: string[]) => SetMetadata<string, AuthorizeDecoratorParam>(AuthorizeDecoratorKey, { type, resources });