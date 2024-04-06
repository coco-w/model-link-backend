import { PartialType } from '@nestjs/swagger'
import { CreateFormEntityDto } from './create-form-entity.dto'

export class UpdateFormEntityDto extends CreateFormEntityDto {
  id: string
}
