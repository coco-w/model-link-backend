import { IntersectionType } from '@nestjs/swagger'
import { UpdateGraphicItemDto } from './update-graphic-item.dto'
import { ListPagination } from 'src/utils/pagination'

export class ListGraphicItemDto extends IntersectionType(
  UpdateGraphicItemDto,
  ListPagination,
) {}
