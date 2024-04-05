import { Module } from '@nestjs/common'
import { GraphicItemService } from './graphic-item.service'
import { GraphicItemController } from './graphic-item.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [GraphicItemController],
  providers: [GraphicItemService],
  imports: [PrismaModule],
})
export class GraphicItemModule {}
