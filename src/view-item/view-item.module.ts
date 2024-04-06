import { Module } from '@nestjs/common';
import { ViewItemService } from './view-item.service';
import { ViewItemController } from './view-item.controller';

@Module({
  controllers: [ViewItemController],
  providers: [ViewItemService],
})
export class ViewItemModule {}
