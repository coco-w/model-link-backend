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
import { SourceModelService } from './source-model.service'
import { CreateSourceModelDto } from './dto/create-source-model.dto'
import { UpdateSourceModelDto } from './dto/update-source-model.dto'
import { UserRequest } from 'src/utils/type'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ListSourceModelDto } from './dto/list-source-model.dto'

@Controller('source-model')
@ApiTags('元模型')
export class SourceModelController {
  constructor(private readonly sourceModelService: SourceModelService) {}

  @Post('add')
  @ApiOperation({ summary: '创建元模型' })
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createSourceModelDto: CreateSourceModelDto,
    @Req() req: UserRequest,
  ) {
    return this.sourceModelService.create(createSourceModelDto, req.user.id)
  }

  @Get()
  findAll() {
    return this.sourceModelService.findAll()
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑元模型' })
  update(
    @Body(new ValidationPipe({ whitelist: true }))
    updateSourceModelDto: UpdateSourceModelDto,
  ) {
    return this.sourceModelService.update(updateSourceModelDto)
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除元模型' })
  remove(@Query('id') id: string) {
    return this.sourceModelService.remove(id)
  }

  @Get('list')
  @ApiOperation({ summary: '元模型列表' })
  list(@Query() query: ListSourceModelDto) {
    return this.sourceModelService.list(query)
  }

  @Get('queryById')
  @ApiOperation({ summary: '根据ID查询元模型' })
  queryById(@Query('id') id: string) {
    return this.sourceModelService.queryById(id)
  }

  @Get('dateRage')
  @ApiOperation({ summary: '查询表单带有日期选择器的元模型' })
  getDateRageSourceModel() {
    return this.sourceModelService.getDateRageSourceModel()
  }
}
