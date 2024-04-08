import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common'
import { SourceModelService } from './source-model.service'
import { CreateSourceModelDto } from './dto/create-source-model.dto'
import { UpdateSourceModelDto } from './dto/update-source-model.dto'
import { UserRequest } from 'src/utils/type'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('source-model')
@ApiTags('元模型')
export class SourceModelController {
  constructor(private readonly sourceModelService: SourceModelService) {}

  @Post()
  @ApiOperation({ summary: '创建元模型' })
  create(
    @Body() createSourceModelDto: CreateSourceModelDto,
    @Req() req: UserRequest,
  ) {
    return this.sourceModelService.create(createSourceModelDto, req.user.id)
  }

  @Get()
  findAll() {
    return this.sourceModelService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourceModelService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSourceModelDto: UpdateSourceModelDto,
  ) {
    return this.sourceModelService.update(+id, updateSourceModelDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceModelService.remove(+id)
  }
}
