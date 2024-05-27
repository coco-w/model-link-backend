import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ValidationPipe,
  Query,
  Res,
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserRequest } from 'src/utils/type'
import { listProjectDto } from './dto/list-project.dto'
import { ApiObjResponse } from 'src/decorator/api-obj-response.decorator'
import { ProjectDetailDto } from './dto/project-detail.dto'
import { SourceAngleViewTree } from 'src/source-angle-view/entities/source-angle-view.entity'

@ApiTags('项目管理')
@Controller('project')
@ApiExtraModels(ProjectDetailDto, ApiObjResponse, SourceAngleViewTree)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '创建项目' })
  @Post('add')
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: UserRequest) {
    return this.projectService.create(createProjectDto, req.user.id)
  }

  @ApiOperation({ summary: '获取项目列表' })
  @Get('list')
  list(
    @Query(new ValidationPipe({ whitelist: true }))
    queryData: listProjectDto,
    @Req() req: UserRequest,
  ) {
    return this.projectService.list(queryData, req.user.id)
  }

  @ApiOperation({ summary: '更新项目' })
  @Post('edit')
  update(
    @Body(new ValidationPipe({ whitelist: true }))
    updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(updateProjectDto)
  }

  @ApiOperation({ summary: '删除项目' })
  @Delete(':id')
  remove(@Query('id') id: string) {
    return this.projectService.remove(id)
  }

  @ApiOperation({ summary: '获取项目详情' })
  @Get('queryById')
  @ApiObjResponse(ProjectDetailDto)
  findOne(@Query('id') id: string) {
    return this.projectService.findOne(id)
  }
}
