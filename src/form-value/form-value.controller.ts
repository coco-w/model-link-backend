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
import { FormValueService } from './form-value.service'
import { CreateFormValueDto } from './dto/create-form-value.dto'
import { UpdateFormValueDto } from './dto/update-form-value.dto'
import { UserRequest } from 'src/utils/type'
import { ApiTags } from '@nestjs/swagger'

@Controller('form-value')
@ApiTags('表单数据')
export class FormValueController {
  constructor(private readonly formValueService: FormValueService) {}

  @Post('add')
  create(
    @Body() createFormValueDto: CreateFormValueDto,
    @Req() req: UserRequest,
  ) {
    return this.formValueService.create(createFormValueDto, req.user.id)
  }

  @Post('edit')
  update(@Body() updateFormValueDto: UpdateFormValueDto) {
    return this.formValueService.update(updateFormValueDto)
  }
}
