import { Module } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { SourceAngleViewService } from 'src/source-angle-view/source-angle-view.service'

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, SourceAngleViewService],
  imports: [PrismaModule],
})
export class ProjectModule {}
