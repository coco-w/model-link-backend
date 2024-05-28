import { Injectable } from '@nestjs/common'
import { CreateGraphViewNodeDto } from './dto/create-graph-view-node.dto'
import { UpdateGraphViewNodeDto } from './dto/update-graph-view-node.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GraphViewNodeService {
  constructor(private prisma: PrismaService) {}
  async create(createGraphViewNodeDto: CreateGraphViewNodeDto, userId: string) {
    if (createGraphViewNodeDto.sourceModelId) {
      const count = await this.prisma.graphViewNode.count({
        where: {
          projectId: createGraphViewNodeDto.projectId,
          sourceModelId: createGraphViewNodeDto.sourceModelId,
        },
      })

      const sourceModel = await this.prisma.sourceModel.findUnique({
        where: {
          id: createGraphViewNodeDto.sourceModelId,
        },
      })
      return await this.prisma.graphViewNode.create({
        data: {
          ...createGraphViewNodeDto,
          userId,
          sourceModelNum: count,
          name: sourceModel.name + (count + 1),
        },
      })
    }
    return await this.prisma.graphViewNode.create({
      data: {
        ...createGraphViewNodeDto,
        userId,
      },
    })
  }

  findAll() {
    return `This action returns all graphViewNode`
  }

  findOne(id: number) {
    return `This action returns a #${id} graphViewNode`
  }

  update(id: number, updateGraphViewNodeDto: UpdateGraphViewNodeDto) {
    return `This action updates a #${id} graphViewNode`
  }

  async remove(id: string) {
    return await this.prisma.graphViewNode.delete({
      where: {
        id,
      },
    })
  }

  async listDetail(projectViewItemId: string) {
    return await this.prisma.graphViewNode.findMany({
      where: {
        projectViewItemId,
      },
      include: {
        sourceModel: {
          include: {
            formEntity: true,
          },
        },
        graphicItem: true,
        quote: true,
      },
    })
  }
}
