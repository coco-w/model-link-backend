import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class ListPagination {
  @ApiProperty({ title: '每页数量', example: 10 })
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
  pageSize: number
  @ApiProperty({ title: '页码', example: 1 })
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
  pageNo: number
}

export class ListPaginationResponseDto<T> {
  @ApiProperty({ title: '每页数量', example: 10 })
  pageSize: number
  @ApiProperty({ title: '页码', example: 1 })
  currentPage: number
  @ApiProperty({ title: '总数量', example: 1 })
  total: number
  @ApiProperty({ title: '数据' })
  records: T[]
}
