import { ListPagination } from 'src/utils/pagination'
import { UpdateFormEntityDto } from './update-form-entity.dto'
import { IntersectionType } from '@nestjs/swagger'
import { CreateFormEntityDto } from './create-form-entity.dto'
import { IsBooleanString } from 'class-validator'

export class ListFormEntityDto extends IntersectionType(
  CreateFormEntityDto,
  ListPagination,
) {}
