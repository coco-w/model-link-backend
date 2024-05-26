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

  update(id: number, updateProjectViewItemDto: UpdateProjectViewItemDto) {
    return `This action updates a #${id} projectViewItem`
  }

  remove(id: number) {
    return `This action removes a #${id} projectViewItem`
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
