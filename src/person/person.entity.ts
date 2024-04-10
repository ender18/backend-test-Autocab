import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecordEntity } from "../record/record.entity";

@Entity({name: 'people'})
export class PersonEntity{

    
    @PrimaryGeneratedColumn()
    dni: number;

    @Column({type : 'varchar', length : 30})
    dniType : string;

    @Column({type : 'varchar', length : 50})
    firstName : string;

    @Column({type : 'varchar', length : 50})
    lastName : string;

    @Column({type : 'varchar', length : 15})
    phone : string;

    @Column({type : 'char'})
    gender : string;

    @Column({type : 'varchar', length : 70})
    email: string;

    @Column({type : 'varchar', length : 250})
    photo : string;

    @OneToMany(() => RecordEntity, (record) => record.person)
    records : RecordEntity[];
}