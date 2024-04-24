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
import { SourceAngleViewService } from './source-angle-view.service'
import { CreateSourceAngleViewDto } from './dto/create-source-angle-view.dto'
import { UpdateSourceAngleViewDto } from './dto/update-source-angle-view.dto'
import { UserRequest } from 'src/utils/type'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateOrderDto } from './dto/update-order.dto'

@Controller('source-angle-view')
@ApiTags('元视角')
export class SourceAngleViewController {
  constructor(
    private readonly sourceAngleViewService: SourceAngleViewService,
  ) {}

  @Post('/add')
  @ApiOperation({ summary: '创建元视角' })
  create(
    @Body() createSourceAngleViewDto: CreateSourceAngleViewDto,
    @Req() req: UserRequest,
  ) {
    return this.sourceAngleViewService.create(
      createSourceAngleViewDto,
      req.user.id,
    )
  }

  @Get('treeList')
  @ApiOperation({ summary: '元视角树形列表' })
  treeList(@Query('frameworkId') frameworkId: string) {
    return this.sourceAngleViewService.treeList(frameworkId)
  }

  @Post('/edit')
  @ApiOperation({ summary: '编辑元视角' })
  update(
    @Body(new ValidationPipe({ whitelist: true }))
    updateSourceAngleViewDto: UpdateSourceAngleViewDto,
  ) {
    return this.sourceAngleViewService.update(updateSourceAngleViewDto)
  }

  @Delete('/delete')
  @ApiOperation({ summary: '删除元视角' })
  remove(@Query('id') id: string) {
    return this.sourceAngleViewService.remove(id)
  }

  @Post('/adjustOrder')
  @ApiOperation({ summary: '调整元视角顺序' })
  adjustOrder(@Body() data: UpdateOrderDto) {
    return this.sourceAngleViewService.adjustOrder(data)
  }
}
