import { Module } from '@nestjs/common'
import { SourceViewService } from './source-view.service'
import { SourceViewController } from './source-view.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [SourceViewController],
  providers: [SourceViewService],
  imports: [PrismaModule],
})
export class SourceViewModule {}
