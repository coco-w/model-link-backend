import { Module } from '@nestjs/common'
import { UploadFileService } from './upload-file.service'
import { UploadFileController } from './upload-file.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
@Module({
  imports: [
    MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        // destination: join(__dirname, '../images'),
        destination: join('./public/uploaded'),
        filename: (_, file, callback) => {
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`
          return callback(null, fileName)
        },
      }),
    }),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
