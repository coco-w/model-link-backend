import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  Req,
} from '@nestjs/common'
import { ProjectViewItemService } from './project-view-item.service'
import { CreateProjectViewItemDto } from './dto/create-project-view-item.dto'
import { UpdateProjectViewItemDto } from './dto/update-project-view-item.dto'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ListViewItemDto } from 'src/view-item/dto/list-veiw-item.dto'
import { UserRequest } from 'src/utils/type'
import { listProjectViewItemDto } from './dto/list-project-view-item.dto'
import { ProjectViewItemDetailDto } from './dto/project-view-item-detail.dto'
import { ListPaginationResponseDto } from 'src/utils/pagination'
import { ApiPaginatedResponse } from 'src/decorator/api-paginated-response.decorator'
import {
  PaginatedDto,
  ResponseListDto,
  ResponseObjDto,
  ResponsePaginatedDto,
} from 'src/utils/content.dto'

@ApiTags('项目视图item')
@Controller('project-view-item')
@ApiExtraModels(
  PaginatedDto,
  ProjectViewItemDetailDto,
  ResponseObjDto,
  ResponseListDto,
  ResponsePaginatedDto,
)
export class ProjectViewItemController {
  constructor(
    private readonly projectViewItemService: ProjectViewItemService,
  ) {}

  @Post('add')
  create(
    @Body() createProjectViewItemDto: CreateProjectViewItemDto,
    @Req() req: UserRequest,
  ) {
    return this.projectViewItemService.create(
      createProjectViewItemDto,
      req.user.id,
    )
  }
  @Get('list')
  @ApiOperation({ summary: '获取项目视图项列表' })
  @ApiPaginatedResponse(ProjectViewItemDetailDto)
  list(
    @Query(new ValidationPipe({ whitelist: true }))
    queryData: listProjectViewItemDto,
    @Req() req: UserRequest,
  ) {
    return this.projectViewItemService.list(queryData, req.user.id)
  }

  @Post('edit')
  @ApiOperation({ summary: '更新项目视图项' })
  update(
    @Body(new ValidationPipe({ whitelist: true }))
    updateProjectViewItemDto: UpdateProjectViewItemDto,
  ) {
    return this.projectViewItemService.update(updateProjectViewItemDto)
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除项目视图项' })
  remove(@Query('id') id: string) {
    return this.projectViewItemService.remove(id)
  }
}
