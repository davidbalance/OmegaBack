import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

  constructor(
    private readonly miliseconds: number
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.miliseconds),
      catchError((err) => {
        return throwError(() => err instanceof TimeoutError
          ? new Error('Request timed out')
          : err)
      })
    );
  }
}
