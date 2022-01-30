import { Controller, Get, Post, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { parse } from 'papaparse';
import * as _ from 'lodash';

import { SalesService } from './sales.service';
import { diskStorage } from 'multer';
import { readFileSync } from 'fs';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('record')
    @UseInterceptors(FileInterceptor('file_asset', { storage : diskStorage({ destination : './files' }) }))

    async createRecord(@UploadedFile() file: Express.Multer.File){
      const csvFile = readFileSync(file.path);
      const data = csvFile.toString();

      const parseCsv = await parse(data, {
        header : true,
        skipEmptyLines : true,
        transformHeader: (header) => _.camelCase(header),
        complete: (results) => results.data
      });
      
      //return this.salesService.createRecord(createRecordDto);

      return parseCsv;
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
