import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  createRecord(createRecordDto: CreateRecordDto) {
    return createRecordDto;
  }

  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  async findAll(): Promise<Sale[]> {
    let sales = await this.salesRepository.find();
    console.log(sales);
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
