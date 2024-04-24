import { Injectable } from '@nestjs/common'
import { CreateSourceAngleViewDto } from './dto/create-source-angle-view.dto'
import { UpdateSourceAngleViewDto } from './dto/update-source-angle-view.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SourceAngleViewService {
  constructor(private prisma: PrismaService) {}
  async create(
    createSourceAngleViewDto: CreateSourceAngleViewDto,
    userId: string,
  ) {
    const sourceData = await this.prisma.sourceAngleView.findMany({
      where: {
        frameworkId: createSourceAngleViewDto.frameworkId,
        pid: {
          equals: createSourceAngleViewDto.pid,
        },
      },
    })
    sourceData.sort((a, b) => a.sort - b.sort)
    const data = await this.prisma.sourceAngleView.create({
      data: {
        ...createSourceAngleViewDto,
        userId: userId,
        sort: sourceData.length
          ? sourceData[sourceData.length - 1].sort + 1
          : 1,
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
    await this.prisma.sourceAngleView.delete({
      where: { id },
    })
    return '删除成功'
  }
}
