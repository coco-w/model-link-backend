import { Injectable } from '@nestjs/common'
import { CreateGraphicItemDto } from './dto/create-graphic-item.dto'
import { UpdateGraphicItemDto } from './dto/update-graphic-item.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListPagination } from 'src/utils/pagination'

@Injectable()
export class GraphicItemService {
  constructor(private prisma: PrismaService) {}
  async create(createGraphicItemDto: CreateGraphicItemDto, userId: string) {
    const item = await this.prisma.graphicItem.create({
      data: {
        ...createGraphicItemDto,
        userId: userId,
      },
    })
    return item.id
  }
  async update(updateGraphicItemDto: UpdateGraphicItemDto) {
    await this.prisma.graphicItem.update({
      data: updateGraphicItemDto,
      where: { id: updateGraphicItemDto.id },
    })
  }

  async remove(id: string) {
    await this.prisma.graphicItem.delete({
      where: {
        id,
      },
    })
  }

  async list(data: UpdateGraphicItemDto & ListPagination) {
    const { pageSize, pageNo, ...rest } = data
    return this.prisma.graphicItem.paginate({
      limit: Number(data.pageSize),
      page: Number(data.pageNo),
      where: {
        name: {
          startsWith: rest.name,
        },
        type: {
          equals: rest.type || undefined,
        },
      },
    })
  }
}
