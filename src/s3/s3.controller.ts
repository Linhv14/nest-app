import {
    Controller,
    Get, Param, Post,
    UploadedFile, UseInterceptors
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express'

@Controller()
export class S3Controller {
    constructor(private readonly s3Service: S3Service) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file): Promise<any> {

        const key = `upload/${Date.now()}_${file.originalname}`
        return await this.s3Service.uploadFile(file)

    }

    @Get('file/:key')
    async geFile(@Param('key') key: string): Promise<string> {
        return await this.s3Service.getFileUrl(key)
    }

    //   @Get('download')
    //   async downloadFile(@Req() req: Request, @Res() res: Response): Promise<void> {
    //     const key = req.query.key as string;

    //     const stream = await this.s3Service.getObject(key);

    //     res.setHeader('Content-disposition', `attachment; filename=${key}`);
    //     res.setHeader('Content-type', 'application/octet-stream');

    //     stream.pipe(res);
    //   }
}