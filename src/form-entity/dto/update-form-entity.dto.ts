import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateFormEntityDto } from './create-form-entity.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateFormEntityDto extends CreateFormEntityDto {
  @ApiProperty({ description: 'id', required: true })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string
}
