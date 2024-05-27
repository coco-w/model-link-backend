import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateGraphViewNodeDto {
  @IsString()
  @ApiProperty({ description: '图视图节点名称' })
  name: string

  @IsNumber()
  @ApiProperty({ description: '图视图节点X轴坐标' })
  axisX: number

  @IsNumber()
  @ApiProperty({ description: '图视图节点Y轴坐标' })
  axisY: number

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '图视图节点元模型序号' })
  sourceModelNum: number

  @IsString()
  @ApiProperty({ description: '图视图节点project id' })
  projectId: string

  @IsString()
  @ApiProperty({ description: '图视图节点视图id' })
  projectViewItemId: string

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '图视图节点引用id' })
  quoteId: string

  @IsString()
  @ApiProperty({ description: '图视图节点graphic item id' })
  graphicItemId: string

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '图视图节点元模型id' })
  sourceModelId: string
}
