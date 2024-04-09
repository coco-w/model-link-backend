import { Injectable } from '@nestjs/common'
import { CreateSourceViewDto } from './dto/create-source-view.dto'
import { UpdateSourceViewDto } from './dto/update-source-view.dto'

@Injectable()
export class SourceViewService {
  create(createSourceViewDto: CreateSourceViewDto) {
    return 'This action adds a new sourceView'
  }

  findAll() {
    return `This action returns all sourceView`
  }

  findOne(id: number) {
    return `This action returns a #${id} sourceView`
  }

  update(id: number, updateSourceViewDto: UpdateSourceViewDto) {
    return `This action updates a #${id} sourceView`
  }

  remove(id: number) {
    return `This action removes a #${id} sourceView`
  }
}
