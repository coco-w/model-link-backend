import { Injectable } from '@nestjs/common'
import { CreateGraphViewEdgeDto } from './dto/create-graph-view-edge.dto'
import { UpdateGraphViewEdgeDto } from './dto/update-graph-view-edge.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GraphViewEdgeService {
  constructor(private prisma: PrismaService) {}
  create(createGraphViewEdgeDto: CreateGraphViewEdgeDto, userId: string) {
    return this.prisma.graphViewEdge.create({
      data: {
        ...createGraphViewEdgeDto,
        userId,
      },
    })
  }

  findAll() {
    return `This action returns all graphViewEdge`
  }

  findOne(id: number) {
    return `This action returns a #${id} graphViewEdge`
  }

  async update(updateGraphViewEdgeDto: UpdateGraphViewEdgeDto) {
    const data = await this.prisma.graphViewEdge.findUnique({
      where: {
        id: updateGraphViewEdgeDto.id,
      },
      include: {
        formValue: true,
      },
    })
    const newData = await this.prisma.graphViewEdge.update({
      where: {
        id: updateGraphViewEdgeDto.id,
      },
      data: {
        ...updateGraphViewEdgeDto,
      },
    })
    // 改变了sourceModelId，去除formValue
    if (
      updateGraphViewEdgeDto.sourceModelId &&
      data.sourceModelId !== updateGraphViewEdgeDto.sourceModelId &&
      data.formValue
    ) {
      await this.prisma.formValue.delete({
        where: {
          id: data.formValue.id,
        },
      })
    }
    return newData
  }

  remove(id: string) {
    return this.prisma.graphViewEdge.delete({
      where: {
        id,
      },
    })
  }

  listDetail(projectViewItemId: string) {
    return this.prisma.graphViewEdge.findMany({
      where: {
        projectViewItemId,
      },
      include: {
        sourceModel: {
          include: {
            formEntity: true,
          },
        },
        formValue: true,
      },
    })
  }
}
