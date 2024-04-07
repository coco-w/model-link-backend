import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateGraphicItemDto {
  @ApiProperty({ title: '名称', example: '圆形', required: false })
  @IsNotEmpty({ message: '名称不能为空' })
  name: string
  @ApiProperty({ title: '结构', example: 'circle' })
  @IsOptional()
  structure: string
  @ApiProperty({
    title: '配置',
    example:
      '{"width":180,"height":180,"fillColor":"#0077b6","structure":"jinsheng","startSize":100,"swimlaneFillColor":"#ffffff","strokeColor":"#16A9C6"}',
  })
  config: string
  @ApiProperty({
    title: 'svg100px',
    example:
      '<svg style="left: 0px; top: 0px; width: 100%; height: 100%; display: block; min-width: 18px; min-height: 18px;"><g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 2.8 10.8 L 2.8 2.8 L 17.2 2.8 L 17.2 10.8" fill="#0077b6" stroke="#16a9c6" stroke-miterlimit="10" pointer-events="all"></path><path d="M 2.8 10.8 L 2.8 17.2 L 17.2 17.2 L 17.2 10.8" fill="#ffffff" stroke="#16a9c6" stroke-miterlimit="10" pointer-events="all"></path><path d="M 2.8 10.8 L 17.2 10.8" fill="none" stroke="white" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden" stroke-width="9"></path><path d="M 2.8 10.8 L 17.2 10.8" fill="none" stroke="#16a9c6" stroke-miterlimit="10" pointer-events="all"></path><g fill="#fff" font-family="Arial,Helvetica" text-anchor="middle" font-size="1.44px"><text x="10" y="5.44">《 类图名称 》</text></g><g fill="#fff" font-family="Arial,Helvetica" text-anchor="middle" font-size="1.44px"><text x="10" y="8.77">类图名称</text></g></g></g><g></g><g></g></g></svg>',
  })
  svgOneHundred: string
  @ApiProperty({
    title: 'svg20px',
    example:
      '<svg style="left: 0px; top: 0px; width: 100%; height: 100%; display: block; min-width: 98px; min-height: 98px;"><g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 2.12 55.12 L 2.12 2.12 L 97.52 2.12 L 97.52 55.12" fill="#0077b6" stroke="#16a9c6" stroke-miterlimit="10" pointer-events="all"></path><path d="M 2.12 55.12 L 2.12 97.52 L 97.52 97.52 L 97.52 55.12" fill="#ffffff" stroke="#16a9c6" stroke-miterlimit="10" pointer-events="all"></path><path d="M 2.12 55.12 L 97.52 55.12" fill="none" stroke="white" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden" stroke-width="9"></path><path d="M 2.12 55.12 L 97.52 55.12" fill="none" stroke="#16a9c6" stroke-miterlimit="10" pointer-events="all"></path><g fill="#fff" font-family="Arial,Helvetica" text-anchor="middle" font-size="9.540000000000001px"><text x="49.82" y="19.61">《 类图名称 》</text></g><g fill="#fff" font-family="Arial,Helvetica" text-anchor="middle" font-size="9.540000000000001px"><text x="49.82" y="41.69">类图名称</text></g></g></g><g></g><g></g></g></svg>',
  })
  svgTwenty: string
  @ApiProperty({ title: '显示的值', example: '' })
  value: string
  @ApiProperty({ enum: ['vertex', 'edge'] })
  @IsNotEmpty({ message: '类型不能为空' })
  type: 'vertex' | 'edge'
}
