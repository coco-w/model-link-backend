import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ValidationPipe,
  Query,
} from '@nestjs/common'
import { GraphViewNodeService } from './graph-view-node.service'
import { CreateGraphViewNodeDto } from './dto/create-graph-view-node.dto'
import { UpdateGraphViewNodeDto } from './dto/update-graph-view-node.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserRequest } from 'src/utils/type'

@ApiTags('图视图节点')
@Controller('graph-view-node')
export class GraphViewNodeController {
  constructor(private readonly graphViewNodeService: GraphViewNodeService) {}

  @Post('add')
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createGraphViewNodeDto: CreateGraphViewNodeDto,
    @Req() req: UserRequest,
  ) {
    return this.graphViewNodeService.create(createGraphViewNodeDto, req.user.id)
  }
  @Get('listDetail')
  @ApiOperation({ summary: '获取图视图节点列表' })
  async listDetail(@Query('projectViewItemId') id: string) {
    return await this.graphViewNodeService.listDetail(id)
  }
  @Get()
  findAll() {
    return this.graphViewNodeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graphViewNodeService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGraphViewNodeDto: UpdateGraphViewNodeDto,
  ) {
    return this.graphViewNodeService.update(+id, updateGraphViewNodeDto)
  }

  @Delete(':id')
  remove(@Query('id') id: string) {
    return this.graphViewNodeService.remove(id)
  }
}
