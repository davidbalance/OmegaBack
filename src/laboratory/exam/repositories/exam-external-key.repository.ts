import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamExternalKey } from "../entities/exam-external-key.entity";

@Injectable()
export class ExamExternalKeyRepository extends AbstractRepository<number, ExamExternalKey> {

    constructor(
        @InjectRepository(ExamExternalKey) private readonly keyModel: Repository<ExamExternalKey>
    ) {
        super(keyModel);
    }
}