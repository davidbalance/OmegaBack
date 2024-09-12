import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { ExamTypeEntity } from "../entities/exam-type.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ExamTypeRepository extends AbstractRepository<number, ExamTypeEntity> {
    constructor(
        @InjectRepository(ExamTypeEntity) private readonly repo: Repository<ExamTypeEntity>
    ) {
        super(repo);
    }
}