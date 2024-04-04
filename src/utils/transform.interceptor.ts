import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpException,
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof HttpException) {
          return {
            code: data.getStatus(),
            message: data.getResponse(),
          }
        }
        if (data instanceof String) {
          return {
            code: 200,
            message: data,
          }
        }
        return {
          data,
          code: 200,
          message: '请求成功',
        }
      }),
    )
  }
}
