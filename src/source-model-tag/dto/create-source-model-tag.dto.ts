import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateSourceModelTagDto {
  @ApiProperty({
    type: String,
    description: 'name of the source model tag',
    required: true,
    example: '标签1',
  })
  @IsString({ message: 'name must be a string' })
  name: string
}
