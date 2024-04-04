import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { jwtConstants } from './constants'
import { JwtModule } from '@nestjs/jwt'
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class UserModule {}
