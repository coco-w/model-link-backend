import { GraphicItem_type } from '@prisma/client'
import { User } from '../../user/entities/user.entity'

export class GraphicItem {
  id: string
  name: string
  structure: string
  createdAt: Date
  updatedAt: Date
  config: string
  svgOneHundred: string
  svgTwenty: string
  type: GraphicItem_type
  userId: string
  value: string
  user?: User
}
