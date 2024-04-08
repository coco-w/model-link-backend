import { Injectable } from '@nestjs/common'
import { CreateFrameworkManagementDto } from './dto/create-framework-management.dto'
import { UpdateFrameworkManagementDto } from './dto/update-framework-management.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListFrameworkManagementDto } from './dto/list-framework-management.dto'

@Injectable()
export class FrameworkManagementService {
  constructor(private prisma: PrismaService) {}
  async create(
    createFrameworkManagementDto: CreateFrameworkManagementDto,
    userId: string,
  ) {
    const data = await this.prisma.frameworkManagement.create({
      data: {
        ...createFrameworkManagementDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return data.id
  }

  async update(updateFrameworkManagementDto: UpdateFrameworkManagementDto) {
    await this.prisma.frameworkManagement.update({
      where: {
        id: updateFrameworkManagementDto.id,
      },
      data: {
        ...updateFrameworkManagementDto,
      },
    })
    return '编辑成功'
  }

  async remove(id: string) {
    await this.prisma.frameworkManagement.delete({
      where: {
        id,
      },
    })
  }

  async list(data: ListFrameworkManagementDto) {
    const { pageNo, pageSize, ...rest } = data
    return await this.prisma.frameworkManagement.paginate({
      page: data.pageNo,
      limit: data.pageSize,
      where: {
        name: {
          contains: rest.name,
        },
        remark: {
          contains: rest.remark,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
  }
}
