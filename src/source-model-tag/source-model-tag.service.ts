import { Injectable } from '@nestjs/common'
import { CreateSourceModelTagDto } from './dto/create-source-model-tag.dto'
import { UpdateSourceModelTagDto } from './dto/update-source-model-tag.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SourceModelTagService {
  constructor(private prisma: PrismaService) {}
  async create(
    createSourceModelTagDto: CreateSourceModelTagDto,
    userId: string,
  ) {
    return (
      await this.prisma.sourceModelTag.create({
        data: {
          ...createSourceModelTagDto,
          userId,
        },
      })
    ).id
  }

  async update(updateSourceModelTagDto: UpdateSourceModelTagDto) {
    await this.prisma.sourceModelTag.update({
      where: { id: updateSourceModelTagDto.id },
      data: updateSourceModelTagDto,
    })
    return '编辑成功'
  }

  async remove(id: string) {
    await this.prisma.sourceModelTag.delete({
      where: { id },
    })
    return '删除成功'
  }

  async findAll() {
    return await this.prisma.sourceModelTag.findMany()
  }
}
