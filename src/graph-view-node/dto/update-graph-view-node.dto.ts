import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateGraphViewNodeDto } from './create-graph-view-node.dto'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateGraphViewNodeDto extends PartialType(
  CreateGraphViewNodeDto,
) {
  @IsString()
  @ApiProperty({ description: '图视图节点id' })
  id: string

  @IsNumber()
  @ApiProperty({ description: '图视图节点width' })
  @IsOptional()
  width: number

  @IsNumber()
  @ApiProperty({ description: '图视图节点height' })
  @IsOptional()
  height: number

  @IsString()
  @ApiProperty({ description: '图视图节点style' })
  @IsOptional()
  style: string
}
