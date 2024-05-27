import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateProjectViewItemDto } from './create-project-view-item.dto'
import { IsString } from 'class-validator'
import { UpdateProjectViewItemDto } from './update-project-view-item.dto'
import { $Enums } from 'modelLinkType'

export class ProjectViewItemDetailDto extends PartialType(
  UpdateProjectViewItemDto,
) {
  viewItemId: string
  viewItemType: $Enums.ViewItem_type
}
