import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewItemService } from './view-item.service';
import { CreateViewItemDto } from './dto/create-view-item.dto';
import { UpdateViewItemDto } from './dto/update-view-item.dto';

@Controller('view-item')
export class ViewItemController {
  constructor(private readonly viewItemService: ViewItemService) {}

  @Post()
  create(@Body() createViewItemDto: CreateViewItemDto) {
    return this.viewItemService.create(createViewItemDto);
  }

  @Get()
  findAll() {
    return this.viewItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewItemDto: UpdateViewItemDto) {
    return this.viewItemService.update(+id, updateViewItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewItemService.remove(+id);
  }
}
