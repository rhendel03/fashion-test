import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SalesModule } from '../dist/sales/sales.module';
import { SalesService } from '../dist/sales/sales.service';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
var path = require('path');
var appRoot = path.resolve(__dirname);

describe('Sales Report', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot({}), SalesModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET sales report`, () => {
        return request(app.getHttpServer())
            .get('/sales/report/2022-01-02/2022-01-07')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it(`/POST sales record`, () => {
        console.debug(appRoot + '/test.csv');
        console.debug('test.csv');
        return request(app.getHttpServer())
            .post('/sales/record')
            .set("Content-Type", "multipart/form-data")
            .attach('file_asset', appRoot + '/test.csv')
            .expect(201)
    });

    afterAll(async () => {
        await app.close();
    });
});
