import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Request } from "express";
import { type } from "os";
import { AuthorizeDecoratorKey } from "./authorize.decorator";
import { Reflector } from "@nestjs/core";

/**
 * Gets the user from the request header
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<Request>().user);


export const ExtraAttribute = Reflector.createDecorator<string>();