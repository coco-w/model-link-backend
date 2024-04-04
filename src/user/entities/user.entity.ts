import { GraphicItem } from '../../graphic-item/entities/graphic-item.entity'

export class User {
  id: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
  GraphicItem?: GraphicItem[]
}
