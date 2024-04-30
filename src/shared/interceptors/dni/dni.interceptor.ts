import { UserService } from '@/user/user/user.service';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { DataInterceptorService } from './data-interceptor.service';

@Injectable()
export class DniInterceptor implements NestInterceptor {

  constructor(
    @Inject(DataInterceptorService) private readonly service: DataInterceptorService
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const sub = request.user as number;
    const user = await this.service.getDni(sub);
    request.user = user;
    return next.handle();
  }
}
