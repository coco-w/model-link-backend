import { IntersectionType, PartialType } from '@nestjs/swagger'
import { CreateProjectDto } from './create-project.dto'
import { ListPagination } from 'src/utils/pagination'

export class listProjectDto extends IntersectionType(
  PartialType(CreateProjectDto),
  ListPagination,
) {}
