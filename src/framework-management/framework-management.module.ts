import { Module } from '@nestjs/common'
import { FrameworkManagementService } from './framework-management.service'
import { FrameworkManagementController } from './framework-management.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [FrameworkManagementController],
  providers: [FrameworkManagementService],
  imports: [PrismaModule],
})
export class FrameworkManagementModule {}
