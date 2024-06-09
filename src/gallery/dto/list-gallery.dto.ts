import { IntersectionType, PartialType } from '@nestjs/swagger'
import { ListPagination } from 'src/utils/pagination'
import { UpdateGalleryDto } from './update-gallery.dto'
import { CreateGalleryDto } from './create-gallery.dto'

export class ListGalleryDto extends IntersectionType(
  ListPagination,
  PartialType(CreateGalleryDto),
) {}
