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
    return this.prisma.sourceView.paginate({
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
            formEntities: true,
          },
        },
      },
    })
  }

  async update(updateSourceViewDto: UpdateSourceViewDto) {
    const [err, _data] = await tryit(this.prisma.sourceView.update)({
      where: {
        id: updateSourceViewDto.id,
      },
      data: updateSourceViewDto,
    })
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
