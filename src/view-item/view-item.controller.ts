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
} from '@nestjs/common'
import { ViewItemService } from './view-item.service'
import { CreateViewItemDto } from './dto/create-view-item.dto'
import { UpdateViewItemDto } from './dto/update-view-item.dto'
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ListViewItemDto } from './dto/list-veiw-item.dto'
import { ApiListResponse } from 'src/decorator/api-list-response.decorator'
import { UpdateGraphicItemDto } from 'src/graphic-item/dto/update-graphic-item.dto'

@Controller('view-item')
@ApiTags('视图')
@ApiExtraModels(ApiListResponse, UpdateGraphicItemDto)
export class ViewItemController {
  constructor(private readonly viewItemService: ViewItemService) {}
  @ApiOperation({ summary: '创建' })
  @Post('/add')
  create(@Body() createViewItemDto: CreateViewItemDto, @Req() req) {
    return this.viewItemService.create(createViewItemDto, req.user.id)
  }

  @Post('edit')
  @ApiOperation({ summary: '更新' })
  update(@Body() updateViewItemDto: UpdateViewItemDto) {
    return this.viewItemService.update(updateViewItemDto)
  }

  @Delete('delete')
  @ApiOperation({
    summary: '删除',
  })
  remove(@Query('id') id: string) {
    return this.viewItemService.remove(id)
  }

  @Get('list')
  @ApiOperation({
    summary: '列表',
  })
  list(@Query() data: ListViewItemDto, @Req() req) {
    return this.viewItemService.list(data, req.user.id)
  }

  @Get('getGraphicsByViewId')
  @ApiOperation({ summary: '查询视图graphics' })
  @ApiListResponse(UpdateGraphicItemDto)
  getGraphicsByViewId(@Query('id') id: string) {
    return this.viewItemService.getGraphicsByViewId(id)
  }

  @Get('queryById')
  @ApiOperation({ summary: '查询' })
  queryById(@Query('id') id: string) {
    return this.viewItemService.queryById(id)
  }
}
