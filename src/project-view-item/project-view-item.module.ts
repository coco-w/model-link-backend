import { Module } from '@nestjs/common'
import { ProjectViewItemService } from './project-view-item.service'
import { ProjectViewItemController } from './project-view-item.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [ProjectViewItemController],
  providers: [ProjectViewItemService],
  imports: [PrismaModule],
})
export class ProjectViewItemModule {}
