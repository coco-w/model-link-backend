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
import { GraphicItemService } from './graphic-item.service'
import { CreateGraphicItemDto } from './dto/create-graphic-item.dto'
import { UpdateGraphicItemDto } from './dto/update-graphic-item.dto'
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { ListPagination } from 'src/utils/pagination'
import { ListGraphicItemDto } from './dto/list-graphic-item.dto'

@ApiTags('图元配置')
@Controller('graphic-item')
export class GraphicItemController {
  constructor(private readonly graphicItemService: GraphicItemService) {}

  @Post()
  @ApiOperation({ summary: '创建' })
  create(@Req() req, @Body() createGraphicItemDto: CreateGraphicItemDto) {
    return this.graphicItemService.create(createGraphicItemDto, req.user.id)
  }

  @Patch()
  @ApiOperation({ summary: '更新' })
  update(
    @Body(new ValidationPipe({ whitelist: true }))
    updateGraphicItemDto: UpdateGraphicItemDto,
  ) {
    return this.graphicItemService.update(updateGraphicItemDto)
  }

  @Delete()
  @ApiOperation({
    summary: '删除',
  })
  remove(@Query('id') id: string) {
    return this.graphicItemService.remove(id)
  }

  @Get('list')
  @ApiOperation({ summary: '分页查询' })
  list(@Query() param: ListGraphicItemDto) {
    return this.graphicItemService.list(param)
  }
}
