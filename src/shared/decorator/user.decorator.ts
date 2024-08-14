import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";

/**
 * Gets the user from the request header
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<Request>().user);


export const ExtraAttribute = Reflector.createDecorator<string>();