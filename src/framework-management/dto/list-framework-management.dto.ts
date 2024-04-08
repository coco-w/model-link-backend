import { IntersectionType, PartialType } from '@nestjs/swagger'
import { ListPagination } from 'src/utils/pagination'
import { CreateFrameworkManagementDto } from './create-framework-management.dto'

export class ListFrameworkManagementDto extends IntersectionType(
  PartialType(CreateFrameworkManagementDto),
  ListPagination,
) {}
