import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamExternalKeyEntity } from "../entities/exam-external-key.entity";

@Injectable()
export class ExamExternalKeyRepository extends AbstractRepository<number, ExamExternalKeyEntity> {

    constructor(
        @InjectRepository(ExamExternalKeyEntity) private readonly keyModel: Repository<ExamExternalKeyEntity>
    ) {
        super(keyModel);
    }
}