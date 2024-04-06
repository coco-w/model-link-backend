import { Injectable } from '@nestjs/common';
import { CreateViewItemDto } from './dto/create-view-item.dto';
import { UpdateViewItemDto } from './dto/update-view-item.dto';

@Injectable()
export class ViewItemService {
  create(createViewItemDto: CreateViewItemDto) {
    return 'This action adds a new viewItem';
  }

  findAll() {
    return `This action returns all viewItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viewItem`;
  }

  update(id: number, updateViewItemDto: UpdateViewItemDto) {
    return `This action updates a #${id} viewItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} viewItem`;
  }
}
