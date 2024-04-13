import { GraphicItem_type, ViewItem_type } from '@prisma/client'

export class SourceView {}
type ViewItemKeys = keyof typeof ViewItem_type

export type ViewAdditionalDataKey = {
  [key in ViewItemKeys]: string[]
}
