import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { FrameworkManagementService } from './framework-management.service'
import { CreateFrameworkManagementDto } from './dto/create-framework-management.dto'
import { UpdateFrameworkManagementDto } from './dto/update-framework-management.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ListFrameworkManagementDto } from './dto/list-framework-management.dto'
import { UserRequest } from 'src/utils/type'

@Controller('framework-management')
@ApiTags('框架管理')
export class FrameworkManagementController {
  constructor(
    private readonly frameworkManagementService: FrameworkManagementService,
  ) {}

  @Post('add')
  @ApiOperation({ summary: '新增框架' })
  create(
    @Body() createFrameworkManagementDto: CreateFrameworkManagementDto,
    @Req() req: UserRequest,
  ) {
    return this.frameworkManagementService.create(
      createFrameworkManagementDto,
      req.user.id,
    )
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑框架' })
  update(
    @Body(new ValidationPipe({ whitelist: true }))
    updateFrameworkManagementDto: UpdateFrameworkManagementDto,
  ) {
    return this.frameworkManagementService.update(updateFrameworkManagementDto)
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除框架' })
  remove(@Query('id') id: string) {
    return this.frameworkManagementService.remove(id)
  }

  @Get('list')
  @ApiOperation({ summary: '框架列表' })
  list(@Query() data: ListFrameworkManagementDto) {
    return this.frameworkManagementService.list(data)
  }
}
