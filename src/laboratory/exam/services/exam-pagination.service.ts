import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";
import { Injectable, Inject } from "@nestjs/common";
import { SelectQueryBuilder } from "typeorm";
import { ExamRepository } from "../repositories/exam.repository";
import { Exam } from "../dtos/response/exam.base.dto";
import { ExamEntity } from "../entities/exam.entity";

@Injectable()
export class ExamPaginationService extends BasePaginationService<ExamEntity, Exam> {

    constructor(
        @Inject(ExamRepository) private readonly repository: ExamRepository,
    ) { super(); }

    protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<ExamEntity> {
        return this.repository.query('exam')
            .innerJoin('exam.subtype', 'subtype', 'subtype.id = :subtype', { subtype: extras })
            .select('exam.id', 'id')
            .addSelect('exam.name', 'name')
            .addSelect('subtype.id', 'subtype')
            .where('exam.name LIKE :name', { name: `%${filter}%` })
    }
}
