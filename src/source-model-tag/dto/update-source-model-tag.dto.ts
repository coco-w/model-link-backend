import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateSourceModelTagDto } from './create-source-model-tag.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateSourceModelTagDto extends PartialType(
  CreateSourceModelTagDto,
) {
  @ApiProperty({
    description: 'The id of the source model tag',
    type: String,
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  id: string
}
