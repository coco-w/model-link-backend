import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateSourceViewDto } from './create-source-view.dto'
import { IsArray, IsOptional, IsString, isArray } from 'class-validator'

export class CreateGraphicItemAndSourceModelRealtionDto {
  graphicItemId: string
  sourceModelId: string
  id?: string
}

export class UpdateSourceViewDto extends PartialType(CreateSourceViewDto) {
  @ApiProperty({
    title: 'ID',
  })
  @IsString({
    message: 'ID必须是字符串',
  })
  id: string

  @ApiProperty({
    title: '绑定的元模型',
    type: () => [String],
  })
  @IsOptional()
  @IsArray()
  sourceModels: string[]

  @ApiProperty({
    title: '视图中图元与元模型的关系数据',
    type: () => [CreateGraphicItemAndSourceModelRealtionDto],
  })
  @IsOptional()
  @IsArray()
  relationData: {
    graphicItemId: string
    sourceModelId: string
    id?: string
  }[]

  @ApiProperty({
    title: '引用的元模型',
    type: () => [String],
  })
  @IsOptional()
  @IsArray()
  quoteData: string[]

  @ApiProperty({
    title: '甘特图元模型',
    type: () => [String],
  })
  @IsOptional()
  @IsArray()
  ganttSourceViewRelation: string[]
}
