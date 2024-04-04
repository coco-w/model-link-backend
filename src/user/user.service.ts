import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const u = await this.prisma.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    })
    if (u) {
      return new HttpException('用户已存在', 400)
    }
    return '注册成功'
  }

  async update(data: UpdateUserDto) {
    try {
      await this.prisma.user.update({
        data: {
          password: data.password,
          realname: data.realname,
        },
        where: { username: data.username },
      })
      return '更新成功'
    } catch (error) {
      return new HttpException('更新失败', 400)
    }
  }

  async login(data: UpdateUserDto) {
    const item = await this.prisma.user.findUnique({
      where: {
        username: data.username,
        password: data.password,
      },
      select: {
        username: true,
        realname: true,
      },
    })
    if (item) {
      const payload = { username: item.username, realname: item.realname }
      const user_token = await this.jwtService.signAsync(payload)
      return {
        user_token,
        user_info: item,
      }
    }
    return new HttpException('账号或密码错误', 400)
  }
}
