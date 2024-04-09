import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { $Enums, Prisma } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsArray, IsObject, IsString } from 'class-validator'

export class CreateSourceModelDto {
  @ApiProperty({ title: '名称', type: 'string' })
  @IsString({ message: '名称必须是字符串' })
  name: string
  @ApiProperty({ title: '类型', type: 'string' })
  @IsString({ message: '类型必须是字符串' })
  type: $Enums.GraphicItem_type
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value
      : value.length > 0
        ? value.split(',').map((tag) => tag)
        : [],
  )
  @ApiProperty({ title: '标签', type: 'array', items: { type: 'object' } })
  @IsArray({ message: '标签必须是数组' })
  tags: string[]
  @ApiProperty({ title: '表单ID', type: 'string' })
  @IsString({ message: '表单ID必须是字符串' })
  formId: string
  @ApiProperty({ title: '图形项', type: 'object' })
  graphicItem?: Prisma.GraphicItemCreateInput
}
