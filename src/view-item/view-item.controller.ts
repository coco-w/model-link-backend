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
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ListViewItemDto } from './dto/list-veiw-item.dto'

@Controller('view-item')
@ApiTags('视图')
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
}
