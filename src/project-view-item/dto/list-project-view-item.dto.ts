import { IntersectionType, PartialType } from '@nestjs/swagger'
import { ListPagination } from 'src/utils/pagination'
import { CreateProjectViewItemDto } from './create-project-view-item.dto'

export class listProjectViewItemDto extends IntersectionType(
  PartialType(CreateProjectViewItemDto),
  ListPagination,
) {}
