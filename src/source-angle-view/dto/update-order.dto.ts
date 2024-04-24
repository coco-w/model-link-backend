import { ApiProperty } from '@nestjs/swagger'

export class UpdateOrderDto {
  @ApiProperty({ description: 'id' })
  id: string

  @ApiProperty({ description: '排序' })
  sort: number

  @ApiProperty({ description: '父级 ID' })
  pid: string
}
