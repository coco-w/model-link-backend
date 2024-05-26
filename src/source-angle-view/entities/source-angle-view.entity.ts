import { SourceAngleView, ProjectViewItem } from '@prisma/client'

export interface SourceAngleViewTree extends SourceAngleView {
  children?: (SourceAngleViewTree | ProjectViewItem)[]
  checked?: boolean
}
