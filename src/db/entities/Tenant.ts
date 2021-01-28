import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('varchar')
    firstname!: string;

    @Column('varchar')
    lastname!: string;
}
