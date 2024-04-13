import { HttpException, Injectable, Logger } from '@nestjs/common'
import { CreateSourceViewDto } from './dto/create-source-view.dto'
import { UpdateSourceViewDto } from './dto/update-source-view.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { tryit } from 'radash'
import { ListSourceModelDto } from 'src/source-model/dto/list-source-model.dto'
import { ListSourceView } from './dto/list-source-view.dto'

@Injectable()
export class SourceViewService {
  constructor(private prisma: PrismaService) {}
  create(createSourceViewDto: CreateSourceViewDto, userId: string) {
    return this.prisma.sourceView.create({
      data: {
        ...createSourceViewDto,
        userId,
      },
    })
  }

  async list(data: ListSourceView) {
    const { pageNo, pageSize, viewId, name, recessiveName, ...rest } = data
    const pageData = await this.prisma.sourceView.paginate({
      limit: pageSize,
      page: pageNo,
      where: {
        ...rest,
        name: {
          contains: name,
        },
        recessiveName: {
          contains: recessiveName,
        },
        viewId: viewId
          ? {
              equals: viewId,
            }
          : undefined,
      },
      include: {
        view: {
          include: {
            graphicItems: true,
            formEntity: true,
          },
        },
        relationData: {
          include: {
            sourceModel: true,
            graphicItem: true,
          },
        },
        quoteData: true,
        sourceModels: true,
      },
    })
    pageData.result.forEach((ele) => {
      ;(ele as any).viewType = ele.view.type
    })
    return pageData
  }

  async update(updateSourceViewDto: UpdateSourceViewDto, userId: string) {
    const existingSourceView = await this.prisma.sourceView.findUnique({
      where: { id: updateSourceViewDto.id },
    })
    if (
      updateSourceViewDto.viewId &&
      existingSourceView.viewId !== updateSourceViewDto.viewId
    ) {
      // 如果 viewId 改变了，清空 sourceModels、relationData 和 quoteData
      updateSourceViewDto.sourceModels = []
      updateSourceViewDto.relationData = []
      updateSourceViewDto.quoteData = []
    }
    const { sourceModels, quoteData, relationData, ...rest } =
      updateSourceViewDto
    const [err, _data] = await tryit(this.prisma.sourceView.update)({
      where: {
        id: updateSourceViewDto.id,
      },
      data: {
        ...rest,
        sourceModels: {
          set: sourceModels.map((sourceModel) => ({
            id: sourceModel,
          })),
        },
        quoteData: {
          set: quoteData.map((quote) => ({
            id: quote,
          })),
        },
        // sourceModels: {
        //   set: sourceModels.map((sourceModel) => ({
        //     id: sourceModel,
        //   })),
        // },
        // quoteData: {
        //   set: quoteData.map((quote) => ({
        //     id: quote,
        //   })),
        // },
      },
    })
    if (relationData) {
      if (relationData.length === 0) {
        await this.prisma.graphicItemAndSourceModelRealtion.deleteMany({
          where: {
            sourceViewId: updateSourceViewDto.id,
          },
        })
      } else {
        // 获取所有 relationData 的 id
        const ids = relationData
          .map((item) => (item.id ? item.id : undefined))
          .filter(Boolean)

        await this.prisma.graphicItemAndSourceModelRealtion.deleteMany({
          where: {
            id:
              ids && ids.length !== 0
                ? {
                    notIn: ids,
                  }
                : undefined,
            sourceViewId: updateSourceViewDto.id, // 只删除与特定 SourceView id 相关的记录
          },
        })
        // 创建一个数组，用于存储所有的 Prisma 操作
        const operations = []

        // 遍历 relationData 数组
        for (const item of relationData) {
          // 对每个元素执行 upsert 操作，并将操作添加到数组中
          operations.push(
            this.prisma.graphicItemAndSourceModelRealtion.upsert({
              where: { id: item.id ? item.id : '' },
              update: item,
              create: {
                user: {
                  connect: {
                    id: userId,
                  },
                },
                sourceView: {
                  connect: {
                    id: updateSourceViewDto.id,
                  },
                },
                graphicItem: {
                  connect: {
                    id: item.graphicItemId,
                  },
                },
                sourceModel: {
                  connect: {
                    id: item.sourceModelId,
                  },
                },
              },
            }),
          )
        }
        // 在一个事务中执行所有的操作
        await this.prisma.$transaction(operations)
      }
    }
    if (err) {
      Logger.error(err)
      return new HttpException('更新失败', 400)
    }
    return '更新成功'
  }

  async remove(id: string) {
    const [err, _data] = await tryit(this.prisma.sourceView.delete)({
      where: {
        id,
      },
    })
    if (err) {
      Logger.error(err)
      return new HttpException('删除失败', 400)
    }
    return `删除成功`
  }
}
