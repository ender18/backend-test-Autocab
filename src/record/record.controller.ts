import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordDTO } from './dto/record.dto';

@Controller('record')
export class RecordController {

    constructor(
        private readonly recordService : RecordService
    ){

    }

    @Get()
    async getAll(){        
        return this.recordService.getAll();
    }

    @Get(':dni')
    async getOne(@Param('dni',ParseIntPipe) dni : number){        
        return await this.recordService.findByDni(dni);
    }

    @Post()
    async createRecord(@Body() dto : RecordDTO){
        return this.recordService.createRecord(dto);
    }



}
