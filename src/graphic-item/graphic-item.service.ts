import { Injectable } from '@nestjs/common'
import { CreateGraphicItemDto } from './dto/create-graphic-item.dto'
import { UpdateGraphicItemDto } from './dto/update-graphic-item.dto'

@Injectable()
export class GraphicItemService {
  create(createGraphicItemDto: CreateGraphicItemDto) {
    return 'This action adds a new graphicItem'
  }

  findAll() {
    return `This action returns all graphicItem`
  }

  findOne(id: number) {
    return `This action returns a #${id} graphicItem`
  }

  update(id: number, updateGraphicItemDto: UpdateGraphicItemDto) {
    return `This action updates a #${id} graphicItem`
  }

  remove(id: number) {
    return `This action removes a #${id} graphicItem`
  }
}
