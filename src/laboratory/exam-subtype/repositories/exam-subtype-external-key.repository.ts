import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamSubtypeExternalKeyEntity } from "../entities/exam-subtype-external-key.entity";

@Injectable()
export class ExamSubtypeExternalKeyRepository extends AbstractRepository<number, ExamSubtypeExternalKeyEntity> {
    constructor(
        @InjectRepository(ExamSubtypeExternalKeyEntity) private readonly keyModel: Repository<ExamSubtypeExternalKeyEntity>
    ) {
        super(keyModel);
    }
}