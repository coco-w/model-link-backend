import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateSourceViewDto } from './create-source-view.dto'

export class UpdateSourceViewDto extends PartialType(CreateSourceViewDto) {
  @ApiProperty({
    title: 'ID',
  })
  id: string
}
