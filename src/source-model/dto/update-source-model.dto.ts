import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateSourceModelDto } from './create-source-model.dto'
import { IsString } from 'class-validator'

export class UpdateSourceModelDto extends PartialType(CreateSourceModelDto) {
  @ApiProperty({ title: 'ID', type: 'string' })
  @IsString({ message: 'ID必须是字符串' })
  id: string
}
