import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { listProjectDto } from './dto/list-project.dto'
import { SourceAngleViewService } from 'src/source-angle-view/source-angle-view.service'

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private sourceAngleView: SourceAngleViewService,
  ) {}
  async create(createProjectDto: CreateProjectDto, userId: string) {
    const data = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId,
      },
    })
    return data.id
  }

  findAll() {
    return `This action returns all project`
  }

  async findOne(id: string) {
    const projectItem = await this.prisma.project.findUnique({
      where: {
        id,
      },
    })
    const treeData = await this.sourceAngleView.treeList(
      projectItem.frameworkManagementId,
    )
    return {
      ...projectItem,
      treeData,
    }
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`
  }

  remove(id: number) {
    return `This action removes a #${id} project`
  }
  async list(data: listProjectDto, userId: string) {
    const { pageNo, pageSize, ...rest } = data
    const result = await this.prisma.project.paginate({
      limit: pageSize,
      page: pageNo,
      where: {
        name: {
          contains: rest.name ? rest.name : undefined,
        },
        userId: userId,
      },
      include: {
        user: true,
      },
    })
    const modifiedResult = {
      ...result,
      result: result.result.map((item) => ({
        ...item,
        user: item.user.username,
      })),
    }

    return modifiedResult
    return result
  }
}
