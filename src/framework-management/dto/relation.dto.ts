import { $Enums } from '@prisma/client'

export class RelationItem {
  id: string
  name: string
  type: 'framework' | 'sourceAngle' | 'sourceView' | 'sourceModel'
  angleType?: 'file' | 'folder' | 'sourceModelFolder'
  children?: RelationItem[]
  sourceViewType?: $Enums.ViewItem_type
}
