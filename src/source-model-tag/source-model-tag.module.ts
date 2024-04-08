import { Module } from '@nestjs/common'
import { SourceModelTagService } from './source-model-tag.service'
import { SourceModelTagController } from './source-model-tag.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [SourceModelTagController],
  providers: [SourceModelTagService],
  imports: [PrismaModule],
})
export class SourceModelTagModule {}
