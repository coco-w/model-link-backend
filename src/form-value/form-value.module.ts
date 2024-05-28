import { Module } from '@nestjs/common'
import { FormValueService } from './form-value.service'
import { FormValueController } from './form-value.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [FormValueController],
  providers: [FormValueService],
  imports: [PrismaModule],
})
export class FormValueModule {}
