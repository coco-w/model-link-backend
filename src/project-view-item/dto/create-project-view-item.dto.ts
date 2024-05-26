import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateProjectViewItemDto {
  @ApiProperty({ description: '名称' })
  @IsString()
  name: string

  @ApiProperty({ description: '项目id' })
  @IsString()
  projectId: string

  @ApiProperty({ description: '元视图id' })
  @IsString()
  sourceViewId: string

  @ApiProperty({ description: '元视角id' })
  @IsString()
  sourceAngleViewId: string
}
