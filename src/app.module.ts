import { Module } from '@nestjs/common'
import { GraphicItemModule } from './graphic-item/graphic-item.module'
import { UserModule } from './user/user.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './user/user.guard'
import { ViewItemModule } from './view-item/view-item.module'
import { FormEntityModule } from './form-entity/form-entity.module'
import { FrameworkManagementModule } from './framework-management/framework-management.module'
import { SourceModelTagModule } from './source-model-tag/source-model-tag.module'
import { SourceModelModule } from './source-model/source-model.module'
import { SourceViewModule } from './source-view/source-view.module'
import { SourceAngleViewModule } from './source-angle-view/source-angle-view.module'
import { ProjectModule } from './project/project.module';
import { ProjectViewItemModule } from './project-view-item/project-view-item.module';
import { GraphViewNodeModule } from './graph-view-node/graph-view-node.module';
import { FormValueModule } from './form-value/form-value.module';
import { GraphViewEdgeModule } from './graph-view-edge/graph-view-edge.module';
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
    SourceAngleViewModule,
    ProjectModule,
    ProjectViewItemModule,
    GraphViewNodeModule,
    FormValueModule,
    GraphViewEdgeModule,
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
