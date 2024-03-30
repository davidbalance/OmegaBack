import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { ClaimEnum } from "../enums";


export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<Request>().user);

export type AuthorizeDecoratorParam = { type: ClaimEnum, resources: string[] };
export const AuthorizeDecoratorKey = "authorize";
export const Authorize = (type: ClaimEnum, ...resources: string[]) => SetMetadata<string, AuthorizeDecoratorParam>(AuthorizeDecoratorKey, { type, resources });