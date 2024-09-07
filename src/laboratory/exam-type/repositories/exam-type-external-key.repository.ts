import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamTypeExternalKeyEntity } from "../entities/exam-type-external-key.entity";

@Injectable()
export class ExamTypeExternalKeyRepository extends AbstractRepository<number, ExamTypeExternalKeyEntity> {
    constructor(
        @InjectRepository(ExamTypeExternalKeyEntity) private readonly keyModel: Repository<ExamTypeExternalKeyEntity>
    ) {
        super(keyModel);
    }
}