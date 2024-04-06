import { Injectable } from '@nestjs/common'
import { CreateFormEntityDto } from './dto/create-form-entity.dto'
import { UpdateFormEntityDto } from './dto/update-form-entity.dto'
import { PrismaService } from 'src/prisma/prisma.service'
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

  update(id: number, updateFormEntityDto: UpdateFormEntityDto) {
    return `This action updates a #${id} formEntity`
  }

  remove(id: number) {
    return `This action removes a #${id} formEntity`
  }
}
