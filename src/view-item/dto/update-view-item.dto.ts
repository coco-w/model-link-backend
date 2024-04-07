import { PartialType } from '@nestjs/swagger'
import { CreateViewItemDto } from './create-view-item.dto'

export class UpdateViewItemDto extends PartialType(CreateViewItemDto) {
  id: string
}
