import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "../person/person.entity";

@Entity({ name: "records"})
export class RecordEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    eventDate : Date;

    @Column({type : 'char'})
    eventType: string;

    @ManyToOne(() => PersonEntity, (person) => person.records, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name : 'person_record'})
    person : PersonEntity;



}