import { Module } from '@nestjs/common'
import { GraphicItemModule } from './graphic-item/graphic-item.module'
import { UserModule } from './user/user.module'
@Module({
  imports: [GraphicItemModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
