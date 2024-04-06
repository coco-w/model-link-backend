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
import { FormEntityService } from './form-entity.service'
import { CreateFormEntityDto } from './dto/create-form-entity.dto'
import { UpdateFormEntityDto } from './dto/update-form-entity.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('form-entity')
@ApiTags('表单配置')
export class FormEntityController {
  constructor(private readonly formEntityService: FormEntityService) {}

  @Post()
  async create(@Body() createFormEntityDto: CreateFormEntityDto, @Req() req) {
    const id = await this.formEntityService.create(
      createFormEntityDto,
      req.user.id,
    )
    return id
  }

  @Get()
  findAll() {
    return this.formEntityService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formEntityService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormEntityDto: UpdateFormEntityDto,
  ) {
    return this.formEntityService.update(+id, updateFormEntityDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formEntityService.remove(+id)
  }
}
