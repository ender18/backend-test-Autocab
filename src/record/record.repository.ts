import { Entity, EntityRepository, Repository } from "typeorm";
import { RecordEntity } from "./record.entity";


@EntityRepository(RecordEntity)
export class RecordRepository extends Repository<RecordEntity>{

    
    
}