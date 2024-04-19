import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateSourceAngleViewDto {
  @ApiProperty({
    title: '名称',
    example: '视图1',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  // @ApiProperty({
  //   title: '排序',
  //   example: 1,
  // })
  // @IsNotEmpty()
  // @IsNumber()
  // sort: number

  @ApiProperty({
    title: '框架ID',
  })
  @IsString()
  @IsNotEmpty()
  frameworkId: string

  @ApiProperty({
    title: '父节点ID',
  })
  @IsOptional()
  @IsString()
  pid: string

  @ApiProperty({
    title: '是否为文件夹节点',
  })
  @IsOptional()
  @IsBoolean()
  isLeaf: boolean

  @ApiProperty({
    title: '视图ID',
  })
  @IsOptional()
  @Transform(({ value }) => (value && value.length > 0 ? value : null))
  @IsString()
  sourceViewId: string

  @ApiProperty({
    title: '是否为限制节点',
    description: 'true: 创建一个，false:无限个',
  })
  @IsOptional()
  @IsBoolean()
  limit: boolean

  @ApiProperty({
    title: '元模型ID',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || null)
  sourceModelId: string
}
