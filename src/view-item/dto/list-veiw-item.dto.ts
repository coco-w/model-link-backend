import { ListPagination } from 'src/utils/pagination'
import { CreateViewItemDto } from './create-view-item.dto'
import { IntersectionType, PartialType } from '@nestjs/swagger'

export class ListViewItemDto extends IntersectionType(
  PartialType(CreateViewItemDto),
  ListPagination,
) {}
