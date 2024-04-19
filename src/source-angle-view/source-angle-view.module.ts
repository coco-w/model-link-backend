import { Module } from '@nestjs/common'
import { SourceAngleViewService } from './source-angle-view.service'
import { SourceAngleViewController } from './source-angle-view.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [SourceAngleViewController],
  providers: [SourceAngleViewService],
  imports: [PrismaModule],
})
export class SourceAngleViewModule {}
