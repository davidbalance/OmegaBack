import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExamEntity } from "../entities/exam.entity";

@Injectable()
export class ExamRepository extends AbstractRepository<number, ExamEntity> {
    constructor(
        @InjectRepository(ExamEntity) private readonly examModel: Repository<ExamEntity>
    ) {
        super(examModel)
    }
}