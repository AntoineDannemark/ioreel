import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    firstname: string;

    @Column('varchar')
    lastname: string;
}

module.exports = User;