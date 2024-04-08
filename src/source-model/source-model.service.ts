import { Injectable } from '@nestjs/common'
import { CreateSourceModelDto } from './dto/create-source-model.dto'
import { UpdateSourceModelDto } from './dto/update-source-model.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SourceModelService {
  constructor(private prisma: PrismaService) {}
  create(createSourceModelDto: CreateSourceModelDto, userId: string) {
    const { tags, formEntityId, graphicItem, ...rest } = createSourceModelDto
    return this.prisma.sourceModel.create({
      data: {
        ...rest,
        tags: {
          connectOrCreate: createSourceModelDto.tags.map((tag) => ({
            where: { name: tag.name },
            create: { name: tag.name, user: { connect: { id: userId } } },
          })),
        },
        formEntity: {
          connect: { id: createSourceModelDto.formEntityId },
        },
        graphicItem: {
          create: {
            ...createSourceModelDto.graphicItem,
            user: {
              connect: { id: userId },
            },
          },
        },
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

  update(id: number, updateSourceModelDto: UpdateSourceModelDto) {
    return `This action updates a #${id} sourceModel`
  }

  remove(id: number) {
    return `This action removes a #${id} sourceModel`
  }
}
