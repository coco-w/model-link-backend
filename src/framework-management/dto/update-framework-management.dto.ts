import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateFrameworkManagementDto } from './create-framework-management.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateFrameworkManagementDto extends PartialType(
  CreateFrameworkManagementDto,
) {
  @ApiProperty({
    description: 'The id of the framework management',
    type: String,
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  id: string
}
