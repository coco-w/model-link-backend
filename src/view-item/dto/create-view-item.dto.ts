import { ApiProperty } from '@nestjs/swagger'
import { $Enums, ViewItem_type } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsArray, IsOptional, IsString, isArray } from 'class-validator'

export class CreateViewItemDto {
  @ApiProperty({ description: '名称', example: 'name' })
  @IsString({ message: 'name必须为字符串' })
  name: string
  @ApiProperty({
    description: '类型',
    example: 'graph',
    enum: ViewItem_type,
  })
  @IsString({ message: 'type必须为字符串' })
  type: $Enums.ViewItem_type
  @ApiProperty({ description: '描述', example: 'description' })
  @IsString({ message: 'description必须为字符串' })
  @IsOptional()
  remark?: string
  @ApiProperty({ description: '表单id', example: ['1', '2'] })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => (isArray(value) ? value : []))
  formId?: string[]
  @ApiProperty({ description: '模型id', example: '1,2,3' })
  // @IsString()
  @IsOptional()
  @Transform(({ value }) => (value.length !== 0 ? value.split(',') : [])) // 字符串转数组
  @IsArray()
  graphics?: string[]
}

// export class CreateViewItemAndFrom
