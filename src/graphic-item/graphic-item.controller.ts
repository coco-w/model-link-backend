import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { GraphicItemService } from './graphic-item.service'
import { CreateGraphicItemDto } from './dto/create-graphic-item.dto'
import { UpdateGraphicItemDto } from './dto/update-graphic-item.dto'

@Controller('graphic-item')
export class GraphicItemController {
  constructor(private readonly graphicItemService: GraphicItemService) {}

  @Post()
  create(@Body() createGraphicItemDto: CreateGraphicItemDto) {
    return this.graphicItemService.create(createGraphicItemDto)
  }

  @Get()
  findAll() {
    return this.graphicItemService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graphicItemService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGraphicItemDto: UpdateGraphicItemDto,
  ) {
    return this.graphicItemService.update(+id, updateGraphicItemDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.graphicItemService.remove(+id)
  }
}
