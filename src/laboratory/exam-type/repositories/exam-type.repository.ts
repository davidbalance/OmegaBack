import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { ExamType } from "../entities/exam-type.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ExamTypeRepository extends AbstractRepository<number, ExamType> {
    constructor(
        @InjectRepository(ExamType) private readonly repo: Repository<ExamType>
    ) {
        super(repo);
    }
}