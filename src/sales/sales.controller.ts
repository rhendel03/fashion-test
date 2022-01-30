import { Controller, Get, Post, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { SalesService } from './sales.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { diskStorage } from 'multer';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('record')
    @UseInterceptors(FileInterceptor('file_asset', { storage : diskStorage({ destination : './files' }) }))

  createRecord(@UploadedFile() file: Express.Multer.File){
    console.log(file);
    return file;
      //return this.salesService.createRecord(createRecordDto);
    }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
