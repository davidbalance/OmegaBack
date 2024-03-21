import { AuthorizationType } from "@/authorization/common";
import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";


export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest());

export type AuthorizeDecoratorParam = { type: AuthorizationType, routes: string[] };
export const AuthorizeDecoratorKey = "authorize";
export const Authorize = (type: AuthorizationType, ...routes: string[]) => SetMetadata<string, AuthorizeDecoratorParam>(AuthorizeDecoratorKey, { type, routes });