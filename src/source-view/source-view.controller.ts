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
import { SourceViewService } from './source-view.service'
import { CreateSourceViewDto } from './dto/create-source-view.dto'
import { UpdateSourceViewDto } from './dto/update-source-view.dto'
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
import { UserRequest } from 'src/utils/type'
import { ListSourceView } from './dto/list-source-view.dto'
import { $Enums } from '@prisma/client'

@Controller('source-view')
@ApiTags('元视图')
export class SourceViewController {
  constructor(private readonly sourceViewService: SourceViewService) {}

  @Post('add')
  @ApiOperation({ summary: '创建元视图' })
  create(
    @Body() createSourceViewDto: CreateSourceViewDto,
    @Req() req: UserRequest,
  ) {
    return this.sourceViewService.create(createSourceViewDto, req.user.id)
  }

  @Get('list')
  @ApiOperation({ summary: '元视图列表' })
  list(
    @Query(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    data: ListSourceView,
  ) {
    return this.sourceViewService.list(data)
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑元视图' })
  update(
    @Body(new ValidationPipe({ whitelist: true }))
    updateSourceViewDto: UpdateSourceViewDto,
    @Req() req: UserRequest,
  ) {
    return this.sourceViewService.update(updateSourceViewDto, req.user.id)
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除元视图' })
  remove(@Query('id') id: string) {
    return this.sourceViewService.remove(id)
  }

  @Get('queryById')
  @ApiOperation({ summary: '查询元视图数据' })
  queryById(@Query('id') id: string) {
    return this.sourceViewService.queryById(id)
  }

  @Get('queryGraphViewDetail')
  @ApiOperation({ summary: '查询Graph元视图详情' })
  queryGraphViewDetail(@Query('id') id: string) {
    return this.sourceViewService.queryGraphViewDetail(id)
  }
}
