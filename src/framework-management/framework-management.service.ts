import { Injectable } from '@nestjs/common'
import { CreateFrameworkManagementDto } from './dto/create-framework-management.dto'
import { UpdateFrameworkManagementDto } from './dto/update-framework-management.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListFrameworkManagementDto } from './dto/list-framework-management.dto'
import { RelationItem } from './dto/relation.dto'
import { Prisma, SourceAngleView as BaseSourceAngleView } from '@prisma/client'
type SourceAngleView = Prisma.SourceAngleViewGetPayload<{
  include: {
    sourceView: {
      include: {
        sourceModels: true
        relationData: {
          include: {
            sourceModel: true
          }
        }
        quoteData: true
        ganttSourceViewRelation: true
        xSourceModel: true
        ySourceModel: true
        measurementRelation: true
        view: true
      }
    }
  }
}>
@Injectable()
export class FrameworkManagementService {
  constructor(private prisma: PrismaService) {}
  async create(
    createFrameworkManagementDto: CreateFrameworkManagementDto,
    userId: string,
  ) {
    const data = await this.prisma.frameworkManagement.create({
      data: {
        ...createFrameworkManagementDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return data.id
  }

  async update(updateFrameworkManagementDto: UpdateFrameworkManagementDto) {
    await this.prisma.frameworkManagement.update({
      where: {
        id: updateFrameworkManagementDto.id,
      },
      data: {
        ...updateFrameworkManagementDto,
      },
    })
    return '编辑成功'
  }

  async remove(id: string) {
    await this.prisma.frameworkManagement.delete({
      where: {
        id,
      },
    })
  }

  async list(data: ListFrameworkManagementDto) {
    const { pageNo, pageSize, ...rest } = data
    return await this.prisma.frameworkManagement.paginate({
      page: data.pageNo,
      limit: data.pageSize,
      where: {
        name: {
          contains: rest.name,
        },
        remark: {
          contains: rest.remark,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
  }

  async getRelation(id: string) {
    const data = await this.prisma.frameworkManagement.findUnique({
      where: {
        id,
      },
    })
    const relations: RelationItem = {
      id: id,
      name: data.name,
      type: 'framework',
      children: [],
    }
    const sourceAngleViewData = await this.prisma.sourceAngleView.findMany({
      where: {
        frameworkId: id,
      },
      include: {
        sourceView: {
          include: {
            sourceModels: true,
            relationData: {
              include: {
                sourceModel: true,
              },
            },
            quoteData: true,
            ganttSourceViewRelation: true,
            xSourceModel: true,
            ySourceModel: true,
            measurementRelation: true,
            view: true,
          },
        },
      },
    })
    await this.deepRelation(
      sourceAngleViewData.filter((ele) => ele.pid === null),
      relations,
      sourceAngleViewData,
    )
    return relations
  }

  async deepRelation(
    data: SourceAngleView[],
    parent: RelationItem,
    sourceData: SourceAngleView[],
  ) {
    data.forEach(async (ele) => {
      const sourceAngle: RelationItem = {
        id: ele.id,
        name: ele.name,
        type: 'sourceAngle',
        angleType:
          ele.isLeaf && !ele.sourceViewId
            ? 'folder'
            : ele.isLeaf && ele.sourceViewId
              ? 'sourceModelFolder'
              : 'file',
        children: [],
      }

      if (ele.sourceView) {
        const sourceView: RelationItem = {
          id: ele.sourceView.id,
          name: ele.sourceView.name,
          type: 'sourceView',
          children: [],
          sourceViewType: ele.sourceView.view.type,
        }
        ele.sourceView.sourceModels.forEach((ele) => {
          sourceView.children.push({
            id: ele.id,
            name: ele.name,
            type: 'sourceModel',
          })
        })
        ele.sourceView.relationData.forEach((ele) => {
          sourceView.children.push({
            id: ele.sourceModel.id,
            name: ele.sourceModel.name,
            type: 'sourceModel',
          })
        })
        ele.sourceView.quoteData.forEach((ele) => {
          sourceView.children.push({
            id: ele.id,
            name: ele.name,
            type: 'sourceModel',
          })
        })
        ele.sourceView.ganttSourceViewRelation.forEach((ele) => {
          sourceView.children.push({
            id: ele.id,
            name: ele.name,
            type: 'sourceModel',
          })
        })
        ele.sourceView.xSourceModel.forEach((ele) => {
          sourceView.children.push({
            id: ele.id,
            name: ele.name,
            type: 'sourceModel',
          })
        })
        ele.sourceView.ySourceModel.forEach((ele) => {
          sourceView.children.push({
            id: ele.id,
            name: ele.name,
            type: 'sourceModel',
          })
        })
        if (ele.sourceView.measurementRelation) {
          sourceView.children.push({
            id: ele.sourceView.measurementRelation.id,
            name: ele.sourceView.measurementRelation.name,
            type: 'sourceModel',
          })
        }
        sourceAngle.children.push(sourceView)
      }
      const nextData = sourceData.filter((item) => item.pid === ele.id)
      if (nextData.length > 0) {
        await this.deepRelation(nextData, sourceAngle, sourceData)
      }
      parent.children.push(sourceAngle)
    })
  }

  async copy(source: string, target: string) {
    const sourceData = await this.prisma.sourceAngleView.findMany({
      where: {
        frameworkId: source,
      },
    })
    sourceData.forEach(async (ele) => {
      await this.deepCopy(ele, target)
    })
  }
  async deepCopy(data: BaseSourceAngleView, target: string, pid?: string) {
    const copyData = await this.prisma.sourceAngleView.create({
      data: {
        ...data,
        frameworkId: target,
        pid: pid ? pid : null,
      },
    })
    const nextData = await this.prisma.sourceAngleView.findMany({
      where: {
        pid: data.id,
      },
    })
    nextData.forEach(async (ele) => {
      await this.deepCopy(ele, target, copyData.id)
    })
  }
}
