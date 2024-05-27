import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateGraphViewNodeDto } from './create-graph-view-node.dto'
import { IsString } from 'class-validator'

export class UpdateGraphViewNodeDto extends PartialType(
  CreateGraphViewNodeDto,
) {
  @IsString()
  @ApiProperty({ description: '图视图节点id' })
  id: string
}
