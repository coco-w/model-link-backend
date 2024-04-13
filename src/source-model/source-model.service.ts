import { Injectable } from '@nestjs/common'
import { CreateSourceModelDto } from './dto/create-source-model.dto'
import { UpdateSourceModelDto } from './dto/update-source-model.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListSourceModelDto } from './dto/list-source-model.dto'

@Injectable()
export class SourceModelService {
  constructor(private prisma: PrismaService) {}
  create(createSourceModelDto: CreateSourceModelDto, userId: string) {
    const { tags, formId, graphicItem, ...rest } = createSourceModelDto
    return this.prisma.sourceModel.create({
      data: {
        ...rest,
        tags: {
          connect: tags.map((tag) => ({
            id: tag,
          })),
        },
        formEntity: {
          connect: { id: createSourceModelDto.formId },
        },
        graphicItem: graphicItem
          ? {
              create: {
                ...createSourceModelDto.graphicItem,
                user: {
                  connect: { id: userId },
                },
              },
            }
          : undefined,
        user: {
          connect: { id: userId },
        },
      },
    })
  }

  findAll() {
    return this.prisma.sourceModel.findMany({
      include: {
        formEntity: true,
        graphicItem: true,
        tags: true,
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} sourceModel`
  }

  async update(updateSourceModelDto: UpdateSourceModelDto) {
    const { tags, formId, graphicItem, ...rest } = updateSourceModelDto
    await this.prisma.sourceModel.update({
      where: { id: updateSourceModelDto.id },
      data: {
        ...rest,
        formEntity: {
          connect: { id: updateSourceModelDto.formId },
        },
        graphicItem: graphicItem
          ? {
              update: {
                where: { id: graphicItem.id },
                data: graphicItem,
              },
            }
          : undefined,
        tags: tags
          ? {
              // 断开所有不在 tags 中的连接
              set: tags.length > 0 ? tags.map((tag) => ({ id: tag })) : [],
            }
          : undefined,
      },
    })
    return '更新成功'
  }

  remove(id: string) {
    return this.prisma.sourceModel.delete({
      where: { id },
    })
  }
  list(data: ListSourceModelDto) {
    const { pageNo, pageSize, ...rest } = data
    const { graphicItem, formId, tags, type, name } = rest
    return this.prisma.sourceModel.paginate({
      page: pageNo,
      limit: pageSize,
      where: {
        name: name ? { contains: name } : undefined,
        type: type ? { equals: type } : undefined,
        formId: formId ? formId : undefined,
        tags:
          tags && tags.length > 0
            ? {
                some: {
                  OR: tags.map((tag) => ({ name: tag })),
                },
              }
            : undefined,
      },
      include: {
        formEntity: true,
        graphicItem: true,
        tags: true,
      },
    })
  }

  queryById(id: string) {
    this.prisma.sourceModel.findUnique({
      where: { id },
      include: {
        formEntity: true,
      },
    })
  }

  getDateRageSourceModel() {
    return this.prisma.sourceModel.findMany({
      where: {
        formEntity: {
          judgment: true,
        },
      },
    })
  }
}
