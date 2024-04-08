import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from './utils/all-exception.filter'
import { TransformInterceptor } from './utils/transform.interceptor'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('model link')
    .setDescription('The Model Link API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      transform: true,
      stopAtFirstError: true,
      // exceptionFactory: (errors) => {
      //   return new Error(errors[0].toString())
      // },
    }),
  )
  app.enableCors()
  await app.listen(3200)
}
bootstrap()
