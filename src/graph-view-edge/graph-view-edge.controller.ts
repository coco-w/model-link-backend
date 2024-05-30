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
import { GraphViewEdgeService } from './graph-view-edge.service'
import { CreateGraphViewEdgeDto } from './dto/create-graph-view-edge.dto'
import { UpdateGraphViewEdgeDto } from './dto/update-graph-view-edge.dto'
import { ApiTags, PartialType } from '@nestjs/swagger'
import { UserRequest } from 'src/utils/type'
import { Prisma } from '@prisma/client'
import { Types } from '@prisma/client/runtime/library'

@Controller('graph-view-edge')
@ApiTags('graph连线')
export class GraphViewEdgeController {
  constructor(private readonly graphViewEdgeService: GraphViewEdgeService) {}

  @Post('add')
  create(
    @Body() createGraphViewEdgeDto: CreateGraphViewEdgeDto,
    @Req() req: UserRequest,
  ) {
    return this.graphViewEdgeService.create(createGraphViewEdgeDto, req.user.id)
  }

  @Get('listDetail')
  listDetail(@Query('projectViewItemId') projectViewItemId: string) {
    return this.graphViewEdgeService.listDetail(projectViewItemId)
  }
  @Post('edit')
  update(@Body() updateGraphViewEdgeDto: UpdateGraphViewEdgeDto) {
    return this.graphViewEdgeService.update(updateGraphViewEdgeDto)
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.graphViewEdgeService.remove(id)
  }
}
