import { HttpException, Injectable } from '@nestjs/common'
import { CreateViewItemDto } from './dto/create-view-item.dto'
import { UpdateViewItemDto } from './dto/update-view-item.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { ListViewItemDto } from './dto/list-veiw-item.dto'

@Injectable()
export class ViewItemService {
  constructor(private prisma: PrismaService) {}
  async create(createViewItemDto: CreateViewItemDto, userId: string) {
    const formId = createViewItemDto.formId
    delete createViewItemDto.formId
    if (createViewItemDto.formId && createViewItemDto.type === 'form') {
      return new HttpException('formId只能在form类型下使用', 400)
    }
    if (createViewItemDto.type === 'form' && !formId) {
      return new HttpException('form类型下formId不能为空', 400)
    }

    const graphics = createViewItemDto.graphics
    delete createViewItemDto.graphics

    const data = await this.prisma.viewItem.create({
      data: {
        ...createViewItemDto,
        userId: userId,
        formId: formId,
        graphicItems: {
          connect: graphics?.map((graphic) => ({
            id: graphic,
          })),
        },
      },
    })

    return data.id
  }

  update(updateViewItemDto: UpdateViewItemDto) {
    const formId = updateViewItemDto.formId
    delete updateViewItemDto.formId
    if (updateViewItemDto.type === 'form' && formId.length === 0) {
      return new HttpException('form类型下formId不能为空', 400)
    }

    const graphics = updateViewItemDto.graphics
    delete updateViewItemDto.graphics

    return this.prisma.viewItem.update({
      data: {
        ...updateViewItemDto,
        formId: formId,
        graphicItems: {
          set: graphics?.map((graphic) => ({
            id: graphic,
          })),
        },
      },
      where: {
        id: updateViewItemDto.id,
      },
    })
  }

  async remove(id: string) {
    await this.prisma.viewItem.delete({
      where: {
        id,
      },
    })
    return '删除成功'
  }

  async list(data: ListViewItemDto, userId: string) {
    const { pageNo = 1, pageSize = 10, type, name, remark } = data
    const where: Prisma.ViewItemWhereInput = {
      userId,
    }
    if (type) {
      where.type = {
        equals: type,
      }
    }
    if (name) {
      where.name = {
        contains: name,
      }
    }
    if (remark) {
      where.remark = {
        contains: remark,
      }
    }
    const list = await this.prisma.viewItem.paginate({
      page: pageNo,
      limit: pageSize,
      where,
      include: {
        graphicItems: true,
        formEntity: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    list.result = list.result.map((item: any) => {
      item.graphics = item.graphicItems.map((graphic) => graphic.id)
      return item
    })

    return list
  }

  async getGraphicsByViewId(id: string) {
    const data = await this.prisma.viewItem.findUnique({
      where: {
        id,
      },
      include: {
        graphicItems: true,
        formEntity: true,
      },
    })
    return data.graphicItems
  }
  async queryById(id: string) {
    return await this.prisma.viewItem.findUnique({
      where: {
        id,
      },
      include: {
        graphicItems: true,
        formEntity: true,
      },
    })
  }
}
