import { Injectable, Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import pagination from 'prisma-paginate'
function extendPrismaClient() {
  const prisma = new PrismaClient()
  const logger = new Logger('Prisma')

  return prisma.$extends(pagination).$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now()
          logger.debug(`Start: ${model}.${operation}`)
          logger.debug(`Args: ${JSON.stringify(args)}`)
          const result = await query(args)
          const end = performance.now()
          const time = end - start
          logger.debug(`${model}.${operation} took ${time}ms`)
          if (operation !== 'findMany') {
            logger.debug(`Result: ${JSON.stringify(result)}`)
          }
          return result
        },
      },
    },
  })
}

// https://github.com/prisma/prisma/issues/18628
const ExtendedPrismaClient = class {
  constructor() {
    return extendPrismaClient()
  }
} as new () => ReturnType<typeof extendPrismaClient>

@Injectable()
export class PrismaService extends ExtendedPrismaClient {}
