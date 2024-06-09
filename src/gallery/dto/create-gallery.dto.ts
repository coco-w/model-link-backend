import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '图片名称',
  })
  name: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '图片宽度',
  })
  width: number
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '图片高度',
  })
  height: number
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '图片路径',
  })
  path: string
}
