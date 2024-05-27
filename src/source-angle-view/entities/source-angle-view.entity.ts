import { SourceAngleView, ProjectViewItem } from '@prisma/client'
import { ProjectViewItemDetailDto } from 'src/project-view-item/dto/project-view-item-detail.dto'
import { UpdateSourceAngleViewDto } from '../dto/update-source-angle-view.dto'

export class SourceAngleViewTree extends UpdateSourceAngleViewDto {
  children?: (SourceAngleViewTree | ProjectViewItemDetailDto)[]
  checked?: boolean
}
