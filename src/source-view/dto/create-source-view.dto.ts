import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateSourceViewDto {
  @ApiProperty({
    title: '名称',
    example: '元视图名称',
    type: String,
  })
  @IsString({
    message: '名称必须是字符串',
  })
  name: string

  @ApiProperty({
    title: '隐形名称',
    example: '隐形名称',
    type: String,
  })
  @IsString({
    message: '隐形名称必须是字符串',
  })
  recessiveName: string
  @ApiProperty({
    title: '设计器ID',
    type: String,
  })
  @IsString({
    message: '设计器ID必须是字符串',
  })
  viewId: string
}
