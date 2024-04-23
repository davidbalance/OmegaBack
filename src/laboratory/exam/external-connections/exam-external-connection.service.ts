import { Inject, Injectable } from "@nestjs/common";
import { ExamExternalKeyService } from "../exam-external-key/exam-external-key.service";
import { Exam } from "../entities/exam.entity";
import { CreateExamExternalRequestDTO, FindOneExamExternalAndUpdateRequestDTO } from "../dtos/exam-external-connection.request.dto";
import { ExamRepository } from "../exam.repository";

@Injectable()
export class ExamExternalConnectionService {

    constructor(
        @Inject(ExamExternalKeyService) private readonly externalKeyService: ExamExternalKeyService,
        @Inject(ExamRepository) private readonly repository: ExamRepository
    ) { }

    /**
     * Creates an exam with the given options
     * @param param0 
     * @returns Exam
     */
    async create({ key, source, ...exam }: CreateExamExternalRequestDTO & { source: string }): Promise<Exam> {
        const newKey = await this.externalKeyService.create({ key, source });
        const newExam = await this.repository.create({
            ...exam,
            externalKey: newKey
        });

        return newExam;
    }

    /**
     * Find one exam if not exists creates it
     * @param param0 
     * @returns Exam
     */
    async findOneOrCreate({ key, source, ...exam }: CreateExamExternalRequestDTO & { source: string }): Promise<Exam> {
        try {
            const foundExam = await this.repository.findOne({
                where: {
                    externalKey: {
                        key: key,
                        source: source
                    }
                }
            });
            return foundExam;
        } catch (error) {
            return this.create({ key, source, ...exam });
        }
    }

    /**
     * Find one exam and updates it with the given values
     * @param param0 
     * @param param1 
     * @returns Exam
     */
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: FindOneExamExternalAndUpdateRequestDTO): Promise<Exam> {
        const foundExam = await this.repository.findOneAndUpdate({
            externalKey: {
                key: key,
                source: source
            }
        }, data);
        return foundExam;

    }
}