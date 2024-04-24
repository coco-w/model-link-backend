import { Injectable } from '@nestjs/common'
import { CreateSourceAngleViewDto } from './dto/create-source-angle-view.dto'
import { UpdateSourceAngleViewDto } from './dto/update-source-angle-view.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class SourceAngleViewService {
  constructor(private prisma: PrismaService) {}
  async create(
    createSourceAngleViewDto: CreateSourceAngleViewDto,
    userId: string,
  ) {
    const maxSort = await this.prisma.sourceAngleView.findFirst({
      where: {
        frameworkId: createSourceAngleViewDto.frameworkId,
        pid: {
          equals: createSourceAngleViewDto.pid,
        },
      },
      orderBy: {
        sort: 'desc',
      },
      select: {
        sort: true,
      },
    })

    const data = await this.prisma.sourceAngleView.create({
      data: {
        ...createSourceAngleViewDto,
        userId: userId,
        sort: maxSort?.sort ? maxSort.sort + 1 : 1,
      },
    })

    return data.id
  }

  async treeList(frameworkId: string) {
    const data = await this.prisma.sourceAngleView.findMany({
      where: {
        frameworkId,
      },
      orderBy: {
        sort: 'asc',
      },
    })
    const treeData = this.deepTree(data, null)
    console.log(treeData)
    return treeData
    // console.log(data)
  }
  deepTree(data: any, pid: string | null) {
    const result = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].pid === pid) {
        const children = this.deepTree(data, data[i].id)
        if (children.length > 0) {
          data[i].children = children
        }
        result.push(data[i])
      }
    }
    return result
  }
  async update(updateSourceAngleViewDto: UpdateSourceAngleViewDto) {
    await this.prisma.sourceAngleView.update({
      data: updateSourceAngleViewDto,
      where: { id: updateSourceAngleViewDto.id },
    })
    return '更新成功'
  }

  async remove(id: string) {
    const delData = await this.prisma.sourceAngleView.delete({
      where: { id },
    })
    const data = await this.prisma.sourceAngleView.findMany({
      where: {
        pid: delData.pid,
        sort: {
          gt: delData.sort,
        },
      },
    })
    const operations = []
    for (const item of data) {
      operations.push(
        this.prisma.sourceAngleView.update({
          data: {
            sort: item.sort - 1,
          },
          where: {
            id: item.id,
          },
        }),
      )
    }
    await this.prisma.$transaction(operations)
    return '删除成功'
  }

  async adjustOrder(data: UpdateOrderDto) {
    const { id, sort: newSort, pid } = data
    // 获取当前的 sourceAngleView
    const currentSourceAngleView = await this.prisma.sourceAngleView.findUnique(
      {
        where: { id },
      },
    )

    if (!currentSourceAngleView) {
      throw new Error('SourceAngleView not found')
    }

    // 获取当前的顺序
    const currentSort = currentSourceAngleView.sort

    // 更新其他 sourceAngleView 的顺序
    await this.prisma.$transaction([
      this.prisma.sourceAngleView.updateMany({
        where: {
          pid: pid,
          sort: {
            gte: Math.min(currentSort, newSort),
            lte: Math.max(currentSort, newSort),
          },
        },
        data: {
          sort: {
            // 如果新的顺序大于当前的顺序，那么其他 sourceAngleView 的顺序减 1
            // 否则，其他 sourceAngleView 的顺序加 1
            decrement: newSort > currentSort ? 1 : -1,
          },
        },
      }),
      // 更新当前的 sourceAngleView 的顺序
      this.prisma.sourceAngleView.update({
        where: { id },
        data: { sort: newSort },
      }),
    ])
    return '调整成功'
  }
}
