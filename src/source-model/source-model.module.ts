import { Module } from '@nestjs/common'
import { SourceModelService } from './source-model.service'
import { SourceModelController } from './source-model.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [SourceModelController],
  providers: [SourceModelService],
  imports: [PrismaModule],
})
export class SourceModelModule {}
