import { Module } from '@nestjs/common'
import { FormEntityService } from './form-entity.service'
import { FormEntityController } from './form-entity.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [FormEntityController],
  providers: [FormEntityService],
  imports: [PrismaModule],
})
export class FormEntityModule {}
