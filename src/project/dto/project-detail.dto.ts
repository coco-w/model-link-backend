import { SourceAngleViewTree } from 'src/source-angle-view/entities/source-angle-view.entity'
import { UpdateProjectDto } from './update-project.dto'

export class ProjectDetailDto extends UpdateProjectDto {
  treeData: SourceAngleViewTree[]
}
