import { Injectable } from '@nestjs/common'
import { CreateFormValueDto } from './dto/create-form-value.dto'
import { UpdateFormValueDto } from './dto/update-form-value.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FormValueService {
  constructor(private prisma: PrismaService) {}
  async create(createFormValueDto: CreateFormValueDto, userId: string) {
    return await this.prisma.formValue.create({
      data: {
        ...createFormValueDto,
        userId,
      },
    })
  }

  findAll() {
    return `This action returns all formValue`
  }

  findOne(id: number) {
    return `This action returns a #${id} formValue`
  }

  async update(updateFormValueDto: UpdateFormValueDto) {
    return await this.prisma.formValue.update({
      where: {
        id: updateFormValueDto.id,
      },
      data: {
        ...updateFormValueDto,
      },
    })
  }

  remove(id: number) {
    return `This action removes a #${id} formValue`
  }
}
