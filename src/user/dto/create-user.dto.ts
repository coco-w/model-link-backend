import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ title: '名称', example: 'admin' })
  name: string
  @ApiProperty({ title: '密码', example: '123456' })
  password: string
}
