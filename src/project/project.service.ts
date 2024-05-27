import { Injectable } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { listProjectDto } from './dto/list-project.dto'
import { SourceAngleViewService } from 'src/source-angle-view/source-angle-view.service'
import { SourceAngleViewTree } from 'src/source-angle-view/entities/source-angle-view.entity'
import { ProjectViewItem } from 'modelLinkType'
import { ProjectViewItemDetailDto } from 'src/project-view-item/dto/project-view-item-detail.dto'

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
    const projectViewItems = await this.prisma.projectViewItem.findMany({
      where: {
        projectId: id,
      },
      include: {
        sourceAngleView: {
          include: {
            sourceView: {
              include: {
                view: true,
              },
            },
          },
        },
      },
    })
    const projectViewItemsDetail: ProjectViewItemDetailDto[] =
      projectViewItems.map((item) => ({
        ...item,
        viewItemId: item.sourceAngleView.sourceView.viewId,
        viewItemType: item.sourceAngleView.sourceView.view.type,
      }))
    this.deepTree(treeData, projectViewItemsDetail)
    return {
      ...projectItem,
      treeData,
    }
  }

  deepTree(
    data: SourceAngleViewTree[],
    projectViewItems: ProjectViewItemDetailDto[],
  ) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      if (item.children && item.children.length > 0) {
        this.deepTree(item.children as SourceAngleViewTree[], projectViewItems)
      }
      const filterData = projectViewItems.filter(
        (projectViewItem) => projectViewItem.sourceAngleViewId === item.id,
      )
      item.children
        ? item.children.concat(filterData)
        : (item.children = filterData)
    }
  }

  async update(updateProjectDto: UpdateProjectDto) {
    await this.prisma.project.update({
      where: {
        id: updateProjectDto.id,
      },
      data: {
        ...updateProjectDto,
      },
    })
    return '更新成功'
  }

  async remove(id: string) {
    await this.prisma.project.delete({
      where: {
        id,
      },
    })
    return '删除成功'
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
