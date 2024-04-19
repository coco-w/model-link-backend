import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateSourceAngleViewDto } from './create-source-angle-view.dto'
import { IsString } from 'class-validator'

export class UpdateSourceAngleViewDto extends PartialType(
  CreateSourceAngleViewDto,
) {
  @ApiProperty({ description: 'id' })
  @IsString()
  id: string
}
