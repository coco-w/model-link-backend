import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateGraphViewEdgeDto {
  @IsString()
  @ApiProperty({ description: '连接点数据' })
  points: string

  @IsString()
  @ApiProperty({ description: '连接线样式' })
  style: string

  @IsString()
  sourceNodeId: string

  @IsString()
  targetNodeId: string

  @IsString()
  projectId: string

  @IsString()
  projectViewItemId: string

  @IsString()
  @IsOptional()
  sourceModelId?: string

  @IsOptional()
  @IsString()
  edgeValue?: string
}
