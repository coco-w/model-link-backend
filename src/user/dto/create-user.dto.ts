import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ title: '名称', example: 'admin' })
  username: string
  @ApiProperty({ title: '密码', example: '123456' })
  password: string
  @ApiProperty({ title: '真实姓名', example: '管理员' })
  realname: string
}
