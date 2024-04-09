import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateSourceModelDto } from './create-source-model.dto'
import { IsArray, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { Prisma } from '@prisma/client'

export class UpdateSourceModelDto extends PartialType(CreateSourceModelDto) {
  @ApiProperty({ title: 'ID', type: 'string' })
  @IsString({ message: 'ID必须是字符串' })
  id: string
}
