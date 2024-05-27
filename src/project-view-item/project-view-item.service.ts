import { Injectable } from '@nestjs/common'
import { CreateProjectViewItemDto } from './dto/create-project-view-item.dto'
import { UpdateProjectViewItemDto } from './dto/update-project-view-item.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListViewItemDto } from 'src/view-item/dto/list-veiw-item.dto'
import { listProjectViewItemDto } from './dto/list-project-view-item.dto'

@Injectable()
export class ProjectViewItemService {
  constructor(private prisma: PrismaService) {}
  async create(
    createProjectViewItemDto: CreateProjectViewItemDto,
    userId: string,
  ) {
    return await this.prisma.projectViewItem.create({
      data: {
        ...createProjectViewItemDto,
        userId,
      },
    })
  }

  findAll() {
    return `This action returns all projectViewItem`
  }

  findOne(id: number) {
    return `This action returns a #${id} projectViewItem`
  }

  async update(updateProjectViewItemDto: UpdateProjectViewItemDto) {
    const { id, ...rest } = updateProjectViewItemDto
    await this.prisma.projectViewItem.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    })
    return 'success'
  }

  async remove(id: string) {
    await this.prisma.projectViewItem.delete({
      where: {
        id,
      },
    })
    return 'success'
  }

  async list(data: listProjectViewItemDto, userId: string) {
    const { pageNo, pageSize, ...rest } = data
    return await this.prisma.projectViewItem.paginate({
      limit: pageSize,
      page: pageNo,
      where: {
        name: {
          contains: rest.name ? rest.name : undefined,
        },
        sourceAngleViewId: {
          equals: rest.sourceAngleViewId ? rest.sourceAngleViewId : undefined,
        },
        userId: userId,
      },
    })
  }
}
