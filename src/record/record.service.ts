import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordEntity } from './record.entity';
import { RecordRepository } from './record.repository';
import { PersonEntity } from 'src/person/person.entity';
import { RecordDTO } from './dto/record.dto';
import { PersonRepository } from 'src/person/person.repository';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity) private recordRepository: RecordRepository,
    @InjectRepository(PersonEntity) private personRepository: PersonRepository,
  ) {}

  async getAll(): Promise<RecordEntity[]> {
    process.env.TZ = 'Bogota';
    const list = this.recordRepository.find();
    return list;
  }

  async createRecord(dto: RecordDTO): Promise<any> {
    const person = await this.personRepository.findOne({
      where: { dni: dto.person_record },
    });
    if (!person) {
      throw new NotFoundException({ message: 'This person does not exist' });
    }
    console.log(dto);
    const record = this.recordRepository.create(dto);
    record.person = person;
    await this.recordRepository.save(record);
    return { message: 'Create record succesfull' };
  }


  async findByDni(dni: number): Promise<RecordEntity[]>{
    process.env.TZ = 'Bogota';
    const person = await this.personRepository.findOne({
        where: { dni: dni },
      });
    if (!person) {
    throw new NotFoundException({ message: 'This person does not exist' });
    }
    const records = await this.recordRepository.find({where: { person: person}});
    if(!records.length){
        throw new NotFoundException({message: 'This person has no records.'});
    }
    return records;
}
}
