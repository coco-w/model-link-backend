import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common'
import { GalleryService } from './gallery.service'
import { CreateGalleryDto } from './dto/create-gallery.dto'
import { UpdateGalleryDto } from './dto/update-gallery.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserRequest } from 'src/utils/type'
import { ListGalleryDto } from './dto/list-gallery.dto'

@Controller('gallery')
@ApiTags('图库管理')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('add')
  @ApiOperation({ summary: '新增' })
  create(@Body() createGalleryDto: CreateGalleryDto, @Req() req: UserRequest) {
    return this.galleryService.create(createGalleryDto, req.user.id)
  }

  @Post('edit')
  @ApiOperation({ summary: '编辑' })
  update(@Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(updateGalleryDto)
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除' })
  remove(@Query('id') id: string) {
    return this.galleryService.remove(id)
  }

  @Get('list')
  @ApiOperation({ summary: '列表' })
  list(@Query() data: ListGalleryDto) {
    return this.galleryService.list(data)
  }
}
