import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { SourceViewService } from './source-view.service'
import { CreateSourceViewDto } from './dto/create-source-view.dto'
import { UpdateSourceViewDto } from './dto/update-source-view.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('source-view')
@ApiTags('元视图')
export class SourceViewController {
  constructor(private readonly sourceViewService: SourceViewService) {}

  @Post()
  create(@Body() createSourceViewDto: CreateSourceViewDto) {
    return this.sourceViewService.create(createSourceViewDto)
  }

  @Get()
  findAll() {
    return this.sourceViewService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourceViewService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSourceViewDto: UpdateSourceViewDto,
  ) {
    return this.sourceViewService.update(+id, updateSourceViewDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceViewService.remove(+id)
  }
}
