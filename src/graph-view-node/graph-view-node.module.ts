import { Module } from '@nestjs/common'
import { GraphViewNodeService } from './graph-view-node.service'
import { GraphViewNodeController } from './graph-view-node.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [GraphViewNodeController],
  providers: [GraphViewNodeService],
  imports: [PrismaModule],
})
export class GraphViewNodeModule {}
