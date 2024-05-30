import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateFormValueDto {
  @IsString()
  @ApiProperty({ description: '表单值entity id' })
  formEntityId: string
  @IsString()
  @ApiProperty({ description: '表单值project id' })
  projectId: string
  @IsString()
  @ApiProperty({ description: '表单值project view id' })
  projectViewItemId: string
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '表单值 节点id' })
  graphViewNodeId: string

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '表单值 连线id' })
  graphViewEdgeId: string

  @IsString()
  @ApiProperty({ description: '表单值 data' })
  data: string
}
