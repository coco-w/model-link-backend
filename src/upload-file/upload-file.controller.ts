import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { UploadFileService } from './upload-file.service'
import { CreateUploadFileDto } from './dto/create-upload-file.dto'
import { UpdateUploadFileDto } from './dto/update-upload-file.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/app.config'

@ApiTags('文件上传')
@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}
  @Post()
  @Public()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传图片' })
  @ApiBody({
    description: 'Upload file',
    type: CreateUploadFileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log('upload', file) // return this.uploadService.upload();
    return file
  }
}
