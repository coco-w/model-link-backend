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
  ParseBoolPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { FormEntityService } from './form-entity.service'
import { CreateFormEntityDto } from './dto/create-form-entity.dto'
import { UpdateFormEntityDto } from './dto/update-form-entity.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ListPagination } from 'src/utils/pagination'
import { ListFormEntityDto } from './dto/list-form-entity.dto'

@Controller('form-entity')
@ApiTags('表单配置')
export class FormEntityController {
  constructor(private readonly formEntityService: FormEntityService) {}

  @Post('add')
  @ApiOperation({ summary: '创建' })
  async create(@Body() createFormEntityDto: CreateFormEntityDto, @Req() req) {
    const id = await this.formEntityService.create(
      createFormEntityDto,
      req.user.id,
    )
    return id
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑' })
  update(@Body() updateFormEntityDto: UpdateFormEntityDto) {
    return this.formEntityService.update(updateFormEntityDto)
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除' })
  remove(@Query('id') id: string) {
    return this.formEntityService.remove(id)
  }

  @Get('list')
  @ApiOperation({ summary: '分页查询' })
  list(@Query() param: ListFormEntityDto) {
    return this.formEntityService.list(param)
  }
}
