import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonDTO } from './dto/person.dto';

@Controller('person')
export class PersonController {


    constructor(
        private readonly personService: PersonService
    ){
    }

    @Get()
    async getAll(){
        return await this.personService.getAll();
    }

    @Get(':dni')
    async getOne(@Param('dni',ParseIntPipe) dni : number){        
        return await this.personService.findByDni(dni);
    }

    @Get(':criteria/:text')
    async search(@Param('criteria') criteria : string, @Param('text') search : string){        
        return await this.personService.searchPerson(criteria, search);
    }


    @Post()
    async create(@Body() dto: PersonDTO){
        return await this.personService.createPerson(dto);
    }

    @Put(':dni')
    async update(@Param('dni',ParseIntPipe) dni : number, @Body() dto: PersonDTO){
        return await this.personService.updatePerson(dni, dto);
    }

    @Delete(':dni')
    async delete(@Param('dni',ParseIntPipe) dni : number){
        return await this.personService.deletePerson(dni);
    }



}
