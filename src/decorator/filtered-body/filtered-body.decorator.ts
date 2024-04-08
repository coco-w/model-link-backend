import 'reflect-metadata'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const FilteredReqData = createParamDecorator(
  ({ dto, type }: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const body = request[type]
    const dtoInstance = new dto()
    const filteredBody = {}

    const properties = Reflect.getMetadata('design:type', dtoInstance)
    for (const key in body) {
      if (properties.includes(key)) {
        filteredBody[key] = body[key]
      }
    }

    return filteredBody
  },
)
