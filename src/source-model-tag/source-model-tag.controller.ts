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
import { SourceModelTagService } from './source-model-tag.service'
import { CreateSourceModelTagDto } from './dto/create-source-model-tag.dto'
import { UpdateSourceModelTagDto } from './dto/update-source-model-tag.dto'
import { UserRequest } from 'src/utils/type'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('source-model-tag')
@ApiTags('元模型标签')
export class SourceModelTagController {
  constructor(private readonly sourceModelTagService: SourceModelTagService) {}

  @Post('add')
  @ApiOperation({ summary: '添加元模型标签' })
  create(
    @Body() createSourceModelTagDto: CreateSourceModelTagDto,
    @Req() req: UserRequest,
  ) {
    return this.sourceModelTagService.create(
      createSourceModelTagDto,
      req.user.id,
    )
  }

  @Get('list')
  @ApiOperation({ summary: '获取元模型标签列表' })
  findAll() {
    return this.sourceModelTagService.findAll()
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑元模型标签' })
  update(@Body() updateSourceModelTagDto: UpdateSourceModelTagDto) {
    return this.sourceModelTagService.update(updateSourceModelTagDto)
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除元模型标签' })
  remove(@Query('id') id: string) {
    return this.sourceModelTagService.remove(id)
  }
}
