import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateProjectViewItemDto } from './create-project-view-item.dto'
import { IsString } from 'class-validator'

export class UpdateProjectViewItemDto extends PartialType(
  CreateProjectViewItemDto,
) {
  @ApiProperty({ description: '项目视图项id' })
  @IsString()
  id: string
}
