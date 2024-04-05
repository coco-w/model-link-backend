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
        if (context.getHandler().name === 'list') {
          return {
            result: {
              records: data.result,
              currentPage: data.page,
              pageSize: data.limit,
              total: data.count,
            },
            code: 200,
            message: '请求成功',
          }
        }
        return {
          result: data,
          code: 200,
          message: '请求成功',
        }
      }),
    )
  }
}
