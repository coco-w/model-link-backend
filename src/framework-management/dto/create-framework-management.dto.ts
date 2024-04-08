import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateFrameworkManagementDto {
  @ApiProperty({
    description: 'The name of the framework management',
    type: String,
    example: 'NestJS',
  })
  @IsString()
  name: string
  @ApiProperty({
    description: 'The remark of the framework management',
    type: String,
    example: 'A progressive NAF framework',
  })
  @IsOptional()
  @IsString()
  remark?: string
}
