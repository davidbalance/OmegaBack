import { Inject, Injectable } from "@nestjs/common";
import { Exam } from "../entities/exam.entity";
import { ExamRepository } from "../repositories/exam.repository";
import { PatchExamRequestDto } from "../dtos/request/patch.exam.request.dto";
import { ExamSubtype } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";
import { ExamSubtypeManagementService } from "@/laboratory/exam-subtype/services/exam-subtype-management.service";
import { PostExamRequestDto } from "../dtos/request/post.exam.request.dto";

@Injectable()
export class ExamManagementService {

    constructor(
        @Inject(ExamRepository) private readonly repository: ExamRepository,
        @Inject(ExamSubtypeManagementService) private readonly subtypeService: ExamSubtypeManagementService,
    ) { }

    async create({ subtype, ...data }: PostExamRequestDto): Promise<Exam> {
        const currentSubtype = await this.subtypeService.findOne(subtype);
        const exam = await this.repository.create({ ...data, subtype: currentSubtype });
        return exam;
    }

    async findOne(id: number): Promise<Exam> {
        const exam = await this.repository.findOne({ where: { id } });
        return exam;
    }

    async updateOne(id: number, { subtype, ...data }: PatchExamRequestDto): Promise<Exam> {
        let currentSubtype: ExamSubtype | undefined = undefined;
        if (subtype) {
            currentSubtype = await this.subtypeService.findOne(subtype);
        }
        const exam = await this.repository.findOneAndUpdate({ id }, { ...data, subtype: currentSubtype });
        return exam;
    }

    async deleteOne(id: number): Promise<void> {
        await this.repository.findOneAndDelete({ id });
    }
}