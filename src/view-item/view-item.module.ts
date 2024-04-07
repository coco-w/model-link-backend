import { Module } from '@nestjs/common'
import { ViewItemService } from './view-item.service'
import { ViewItemController } from './view-item.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [ViewItemController],
  providers: [ViewItemService],
  imports: [PrismaModule],
})
export class ViewItemModule {}
