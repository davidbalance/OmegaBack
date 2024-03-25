import { AuthorizationType } from "@/authorization/common";
import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";
import { Request } from "express";


export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<Request>().user);

export type AuthorizeDecoratorParam = { type: AuthorizationType, resources: string[] };
export const AuthorizeDecoratorKey = "authorize";
export const Authorize = (type: AuthorizationType, ...resources: string[]) => SetMetadata<string, AuthorizeDecoratorParam>(AuthorizeDecoratorKey, { type, resources });