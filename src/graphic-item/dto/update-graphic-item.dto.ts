import { PartialType } from '@nestjs/mapped-types'
import { CreateGraphicItemDto } from './create-graphic-item.dto'

export class UpdateGraphicItemDto extends PartialType(CreateGraphicItemDto) {
  id: string
}
