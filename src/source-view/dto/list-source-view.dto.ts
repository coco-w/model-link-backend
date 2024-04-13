import { IntersectionType, PartialType } from '@nestjs/swagger'
import { ListPagination } from 'src/utils/pagination'
import { CreateSourceViewDto } from './create-source-view.dto'

export class ListSourceView extends IntersectionType(
  PartialType(CreateSourceViewDto),
  ListPagination,
) {}
