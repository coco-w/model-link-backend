import { Module } from '@nestjs/common'
import { GraphicItemModule } from './graphic-item/graphic-item.module'
import { UserModule } from './user/user.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './user/user.guard'
@Module({
  imports: [GraphicItemModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
