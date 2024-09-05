import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";
import { Injectable, Inject } from "@nestjs/common";
import { SelectQueryBuilder } from "typeorm";
import { Exam } from "../entities/exam.entity";
import { ExamRepository } from "../repositories/exam.repository";
import { ExamResponseDto } from "../dtos/response/base.exam.response.dto";

@Injectable()
export class ExamPaginationService extends BasePaginationService<Exam, ExamResponseDto> {

    constructor(
        @Inject(ExamRepository) private readonly repository: ExamRepository,
    ) { super(); }

    protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<Exam> {
        return this.repository.query('exam')
            .innerJoin('exam.subtype', 'subtype', 'subtype.id = :subtype', { subtype: extras })
            .select('exam.id', 'id')
            .addSelect('exam.name', 'name')
            .where('exam.name LIKE :name', { name: `%${filter}%` })
    }
}
