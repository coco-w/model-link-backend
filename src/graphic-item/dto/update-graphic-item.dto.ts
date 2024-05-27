import { PartialType } from '@nestjs/swagger'
import { CreateGraphicItemDto } from './create-graphic-item.dto'
import { IsString } from 'class-validator'

export class UpdateGraphicItemDto extends PartialType(CreateGraphicItemDto) {
  @IsString()
  id: string
}
