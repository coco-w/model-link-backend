import { Module } from '@nestjs/common'
import { GraphicItemModule } from './graphic-item/graphic-item.module'
import { UserModule } from './user/user.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './user/user.guard'
import { ViewItemModule } from './view-item/view-item.module'
import { FormEntityModule } from './form-entity/form-entity.module'
import { FrameworkManagementModule } from './framework-management/framework-management.module'
import { SourceModelTagModule } from './source-model-tag/source-model-tag.module'
import { SourceModelModule } from './source-model/source-model.module';
import { SourceViewModule } from './source-view/source-view.module';
@Module({
  imports: [
    GraphicItemModule,
    UserModule,
    ViewItemModule,
    FormEntityModule,
    FrameworkManagementModule,
    SourceModelTagModule,
    SourceModelModule,
    SourceViewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
