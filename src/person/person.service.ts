import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';
import { PersonRepository } from './person.repository';
import { PersonDTO } from './dto/person.dto';

@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(PersonEntity) 
        private personRepository : PersonRepository){
    }

    async getAll(): Promise<PersonEntity[]>{
        const list = await this.personRepository.find();
        if(!list.length){
            throw new NotFoundException({message: 'The list is empty'});
        }
        return list;
    }

    async findByDni(dni: number): Promise<PersonEntity>{        
        const person = await this.personRepository.findOne({where: { dni: dni}, relations : ['records']});
        if(!person){
            throw new NotFoundException({message: 'The person does not exist'});
        }
        return person;
    }

    async createPerson(dto : PersonDTO): Promise<any>{
        const person = await this.personRepository.findOne({where: { dni: dto.dni}});
        if(!person){
            const person = this.personRepository.create(dto);
            await this.personRepository.save(person);
            return {message : 'Create person succesfull'};
        }
        throw new NotFoundException({message: 'This person already exist'});
    }

    async updatePerson(dni : number, dto : PersonDTO): Promise<any>{
        const person = await this.personRepository.findOne({where: { dni: dni}});
        dto.dniType? person.dniType = dto.dniType : person.dniType = person.dniType;
        dto.firstName? person.firstName = dto.firstName : person.firstName = person.firstName;
        dto.lastName? person.lastName = dto.lastName : person.lastName = person.lastName;
        dto.phone? person.phone = dto.phone : person.phone = person.phone;
        dto.gender? person.gender = dto.gender : person.gender = person.gender;
        dto.email? person.email = dto.email : person.email = person.email;
        dto.photo? person.photo = dto.photo : person.photo = person.photo;
        await this.personRepository.save(person);
        return {message : 'Update person succesfull'};
    }


    async deletePerson(dni : number): Promise<any>{
        const person = await this.personRepository.findOne({where: { dni: dni}});
        await this.personRepository.delete(person);
        return {message : 'Delete person succesfull'};
    }


    async searchPerson(criteria : string, text : string) : Promise<any>{
        let people : PersonEntity [] = [];

        if(criteria === "D"){
            try {
                people = await this.personRepository.find({where: { dni: +text}});                
            } catch (error) {
                throw new NotFoundException({message: 'The format of DNI is invalid'});

            }
        }else if(criteria === "F"){
            people = await this.personRepository.find({where: { firstName: text}});
        }else if(criteria === "L"){
            people = await this.personRepository.find({where: { lastName: text}});
        }else{
            
        }
        if(!people){
            throw new NotFoundException({message: 'The person does not exist'});
        }
        return people;
    }





}
