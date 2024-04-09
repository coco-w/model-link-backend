import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import { CreateSourceModelDto } from './create-source-model.dto'
import { ListPagination } from 'src/utils/pagination'
import { Transform } from 'class-transformer'
import { IsArray } from 'class-validator'
import { Prisma } from '@prisma/client'

export class ListSourceModelDto extends IntersectionType(
  PartialType(CreateSourceModelDto),
  ListPagination,
) {}
