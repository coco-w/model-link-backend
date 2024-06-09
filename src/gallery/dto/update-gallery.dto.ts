import { PartialType } from '@nestjs/swagger'
import { CreateGalleryDto } from './create-gallery.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateGalleryDto extends PartialType(CreateGalleryDto) {
  @IsString()
  @IsNotEmpty()
  id: string
}
