import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

import { UpdateSaleDto } from './dto/update-sale.dto';
import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async createRecord(createRecordDto: CreateRecordDto) {
    let record = new Sale();
    record.userName = createRecordDto.userName;
    record.age = createRecordDto.age;
    record.height = createRecordDto.height;
    record.gender = createRecordDto.gender;
    record.sales = createRecordDto.sales;
    record.lastPurchaseDate = createRecordDto.lastPurchaseDate;

    let saveRecord = await this.salesRepository.save(record);
    return saveRecord;
  }

  async findAll(): Promise<Sale[]> {
    let sales = await this.salesRepository.find();
    return sales;
  }

  findOne(id: number): Promise<Sale> {
    return this.salesRepository.findOne(id);
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
