import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizeDecoratorKey, AuthorizeDecoratorParam } from '@/shared/decorator';
import { Request } from 'express';
import { AuthorizationService } from '@/shared/shared-authorization/authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthorizationService) private readonly authorization: AuthorizationService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const params: AuthorizeDecoratorParam | undefined = this.reflector.getAllAndOverride<AuthorizeDecoratorParam | undefined>(AuthorizeDecoratorKey, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!params) return false;
    const request: Request = context.switchToHttp().getRequest<Request>();
    const { user }: any = request;
    if (!user) return false;

    const canPass = await this.authorization.canAccess(user, params.type, params.resources);
    return canPass;
  }
}
