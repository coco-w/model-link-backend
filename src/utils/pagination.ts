import { ApiProperty } from '@nestjs/swagger'

export class ListPagination {
  @ApiProperty({ title: '每页数量', example: 10 })
  pageSize: number
  @ApiProperty({ title: '页码', example: 1 })
  pageNo: number
}
