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
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ListViewItemDto } from 'src/view-item/dto/list-veiw-item.dto'
import { UserRequest } from 'src/utils/type'
import { listProjectViewItemDto } from './dto/list-project-view-item.dto'

@ApiTags('项目视图item')
@Controller('project-view-item')
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
  list(
    @Query(new ValidationPipe({ whitelist: true }))
    queryData: listProjectViewItemDto,
    @Req() req: UserRequest,
  ) {
    return this.projectViewItemService.list(queryData, req.user.id)
  }
}
