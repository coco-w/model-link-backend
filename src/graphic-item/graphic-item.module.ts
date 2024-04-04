import { Module } from '@nestjs/common'
import { GraphicItemService } from './graphic-item.service'
import { GraphicItemController } from './graphic-item.controller'

@Module({
  controllers: [GraphicItemController],
  providers: [GraphicItemService],
})
export class GraphicItemModule {}
