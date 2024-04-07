import { PartialType } from '@nestjs/swagger'
import { CreateGraphicItemDto } from './create-graphic-item.dto'

export class UpdateGraphicItemDto extends PartialType(CreateGraphicItemDto) {
  id?: string
}
