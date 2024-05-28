import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateFormValueDto } from './create-form-value.dto'
import { IsString } from 'class-validator'

export class UpdateFormValueDto extends PartialType(CreateFormValueDto) {
  @IsString()
  @ApiProperty({ description: '表单值id' })
  id: string
}
