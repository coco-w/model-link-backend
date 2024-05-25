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
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserRequest } from 'src/utils/type'
import { listProjectDto } from './dto/list-project.dto'

@ApiTags('项目管理')
@Controller('project')
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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto)
  }

  @ApiOperation({ summary: '删除项目' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id)
  }

  @ApiOperation({ summary: '获取项目详情' })
  @Get('queryById')
  findOne(@Query('id') id: string) {
    return this.projectService.findOne(id)
  }
}
