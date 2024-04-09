import { Module } from '@nestjs/common'
import { SourceViewService } from './source-view.service'
import { SourceViewController } from './source-view.controller'

@Module({
  controllers: [SourceViewController],
  providers: [SourceViewService],
})
export class SourceViewModule {}
