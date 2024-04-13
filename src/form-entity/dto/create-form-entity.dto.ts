import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class CreateFormEntityDto {
  @ApiProperty({ title: '名称', example: '表单实体' })
  name: string
  @ApiProperty({ title: '是否启用包含startTime和endTime', example: true })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'boolean' ? value : false))
  judgment?: boolean
  @ApiProperty({ title: '表单实体备注', example: '' })
  remark?: string
  @ApiProperty({
    title: '表单实体配置',
    example:
      '{"widgetList":[{"key":"62848839","type":"textarea","icon":"textarea-field","formItemFlag":true,"options":{"name":"textarea74980642","label":"系统介绍","labelAlign":"","rows":3,"defaultValue":"","placeholder":"","columnWidth":"200px","size":"","labelWidth":null,"labelHidden":false,"readonly":false,"disabled":false,"hidden":false,"required":false,"requiredHint":"","validation":"","validationHint":"","customClass":"","labelIconClass":null,"labelIconPosition":"rear","labelTooltip":null,"minLength":null,"maxLength":null,"showWordLimit":false,"onCreated":"","onMounted":"","onInput":"","onChange":"","onFocus":"","onBlur":"","onValidate":""},"id":"textarea74980642"}],"formConfig":{"modelName":"formData","refName":"vForm","rulesName":"rules","labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":"","functions":"","layoutType":"PC","jsonVersion":3,"onFormCreated":"","onFormMounted":"","onFormDataChange":""}}',
  })
  @IsOptional()
  config?: string
}
