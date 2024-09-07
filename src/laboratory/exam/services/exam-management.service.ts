import { Inject, Injectable } from "@nestjs/common";
import { ExamRepository } from "../repositories/exam.repository";
import { PatchExamRequestDto } from "../dtos/request/exam.patch.dto";
import { ExamSubtypeManagementService } from "@/laboratory/exam-subtype/services/exam-subtype-management.service";
import { PostExamRequestDto } from "../dtos/request/exam.post.dto";
import { Exam } from "../dtos/response/exam.base.dto";

@Injectable()
export class ExamManagementService {

    constructor(
        @Inject(ExamRepository) private readonly repository: ExamRepository,
        @Inject(ExamSubtypeManagementService) private readonly subtypeService: ExamSubtypeManagementService,
    ) { }

    async create({ subtype, ...data }: PostExamRequestDto): Promise<Exam> {
        const { type, ...currentSubtype } = await this.subtypeService.findOne(subtype);
        const exam = await this.repository.create({ ...data, subtype: currentSubtype });
        return { ...exam, subtype };
    }

    async findOne(id: number): Promise<Exam> {
        const exam = await this.repository.findOne({ where: { id }, relations: { subtype: true } });
        return { ...exam, subtype: exam.subtype.id };
    }

    async updateOne(id: number, { subtype, ...data }: PatchExamRequestDto): Promise<Exam> {
        let currentSubtype: any | undefined = undefined;
        if (subtype) {
            const { type, ...current } = await this.subtypeService.findOne(subtype);
            currentSubtype = current;

        }
        const exam = await this.repository.findOneAndUpdate({ id }, { ...data, subtype: currentSubtype });
        return { ...exam, subtype: exam.subtype.id };
    }

    async deleteOne(id: number): Promise<void> {
        await this.repository.findOneAndDelete({ id });
    }
}