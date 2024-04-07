import { Injectable } from '@nestjs/common'
import { CreateFormEntityDto } from './dto/create-form-entity.dto'
import { UpdateFormEntityDto } from './dto/update-form-entity.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListFormEntityDto } from './dto/list-form-entity.dto'
@Injectable()
export class FormEntityService {
  constructor(private prisma: PrismaService) {}
  async create(createFormEntityDto: CreateFormEntityDto, userId: string) {
    const data = await this.prisma.formEntity.create({
      data: {
        ...createFormEntityDto,
        userId: userId,
      },
    })
    return data.id
  }

  findAll() {
    return `This action returns all formEntity`
  }

  findOne(id: number) {
    return `This action returns a #${id} formEntity`
  }

  async update(updateFormEntityDto: UpdateFormEntityDto) {
    const { id, ...data } = updateFormEntityDto
    await this.prisma.formEntity.update({
      where: { id: id },
      data: data,
    })
    return '更新成功'
  }

  async remove(id: string) {
    await this.prisma.formEntity.delete({
      where: { id: id },
    })
    return '删除成功'
  }
  list(data: ListFormEntityDto) {
    const { pageSize, pageNo, ...rest } = data
    return this.prisma.formEntity.paginate({
      limit: data.pageSize,
      page: data.pageNo,
      where: {
        name: {
          startsWith: rest.name,
        },
        judgment: {
          equals: rest.judgment,
        },
      },
    })
  }
}
