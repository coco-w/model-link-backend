import { ApiProperty } from '@nestjs/swagger'

class ResponseDto {
  @ApiProperty()
  code: number
  @ApiProperty()
  msg: string
}

export class ResponseObjDto<TData> extends ResponseDto {
  @ApiProperty()
  data: TData
}

export class ResponseListDto<TData> extends ResponseDto {
  @ApiProperty()
  data: TData[]
}

export class PaginatedDto<TData> {
  @ApiProperty()
  total: number

  @ApiProperty()
  pageSize: number

  @ApiProperty()
  currentPage: number

  @ApiProperty()
  records: TData[]
}

export class ResponsePaginatedDto<TData> extends ResponseDto {
  @ApiProperty()
  data: PaginatedDto<TData>
}
