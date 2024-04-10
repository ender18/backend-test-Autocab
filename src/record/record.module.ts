import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { RecordEntity } from './record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from 'src/person/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity, PersonEntity])],
  providers: [RecordService],
  controllers: [RecordController]
})
export class RecordModule {}
