import { Injectable } from '@nestjs/common'
import { CreateGalleryDto } from './dto/create-gallery.dto'
import { UpdateGalleryDto } from './dto/update-gallery.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListPagination } from 'src/utils/pagination'

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}
  create(createGalleryDto: CreateGalleryDto, userId: string) {
    return this.prisma.gallery.create({
      data: {
        ...createGalleryDto,
        userId,
      },
    })
  }

  update(updateGalleryDto: UpdateGalleryDto) {
    return this.prisma.gallery.update({
      where: {
        id: updateGalleryDto.id,
      },
      data: {
        ...updateGalleryDto,
      },
    })
  }

  remove(id: string) {
    return this.prisma.gallery.delete({
      where: {
        id,
      },
    })
  }

  list(data: ListPagination & Partial<CreateGalleryDto>) {
    const { pageSize, pageNo, ...rest } = data
    return this.prisma.gallery.paginate({
      limit: Number(data.pageSize),
      page: Number(data.pageNo),
      where: {
        name: {
          startsWith: rest.name,
        },
      },
    })
  }
}
