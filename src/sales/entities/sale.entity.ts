import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name : "Sales" })
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    age: number;

    @Column()
    height: string;

    @Column()
    gender: string;

    @Column()
    sales: string;

    @Column()
    lastPurchaseDate: Date;    
}
