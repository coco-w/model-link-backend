import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateProjectDto {
  @ApiProperty({ description: '名称' })
  @IsString()
  name: string

  @ApiProperty({ description: '框架管理id' })
  @IsString()
  frameworkManagementId: string

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string
}
