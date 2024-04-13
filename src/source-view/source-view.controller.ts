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
  // @Get()
  // findAll() {
  //   return this.sourceViewService.findAll()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sourceViewService.findOne(+id)
  // }

  @Post('edit')
  @ApiOperation({ summary: '编辑元视图' })
  update(@Body() updateSourceViewDto: UpdateSourceViewDto) {
    return this.sourceViewService.update(updateSourceViewDto)
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除元视图' })
  remove(@Query('id') id: string) {
    return this.sourceViewService.remove(id)
  }
}
