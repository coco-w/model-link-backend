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
  @ApiOperation({ summary: '编辑元视角' })
  remove(@Query('id') id: string) {
    return this.sourceAngleViewService.remove(id)
  }
}
