import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const u = await this.prisma.user.findUnique({
      where: {
        name: createUserDto.name,
      },
    })
    if (u) {
      return new HttpException('用户已存在', 400)
    }
    return this.prisma.user.create({ data: createUserDto })
  }

  async update(data: UpdateUserDto) {
    try {
      await this.prisma.user.update({
        data: {
          password: data.password,
        },
        where: { name: data.name },
      })
      return '更新成功'
    } catch (error) {
      return new HttpException('更新失败', 400)
    }
  }

  async login(data: UpdateUserDto) {
    const item = await this.prisma.user.findUnique({
      where: {
        name: data.name,
        password: data.password,
      },
      select: {
        name: true,
      },
    })
    return item || new HttpException('账号或密码错误', 400)
  }
}
