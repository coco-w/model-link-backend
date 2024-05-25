import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateProjectDto } from './create-project.dto'
import { IsString } from 'class-validator'

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ name: 'id' })
  @IsString()
  id: string
}
