import { Module } from '@nestjs/common'
import { GraphViewEdgeService } from './graph-view-edge.service'
import { GraphViewEdgeController } from './graph-view-edge.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [GraphViewEdgeController],
  providers: [GraphViewEdgeService],
  imports: [PrismaModule],
})
export class GraphViewEdgeModule {}
