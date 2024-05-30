import { PartialType } from '@nestjs/swagger'
import { CreateGraphViewEdgeDto } from './create-graph-view-edge.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateGraphViewEdgeDto extends PartialType(
  CreateGraphViewEdgeDto,
) {
  @IsString()
  id: string
}
