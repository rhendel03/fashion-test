import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async createRecord(salesData) {
    let save = await this.salesRepository
      .createQueryBuilder()
      .insert()
      .into(Sale)
      .values(salesData)
      .execute();

    return save;
  }

  async findAll(): Promise<Sale[]> {
    let sales = await this.salesRepository.find();
    return sales;
  }

  findOne(id: number): Promise<Sale> {
    return this.salesRepository.findOne(id);
  }

}
