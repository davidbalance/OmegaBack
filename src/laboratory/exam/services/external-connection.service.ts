import { Inject, Injectable } from "@nestjs/common";
import { Exam } from "../entities/exam.entity";
import { ExamRepository } from "../exam.repository";
import { PATCHExamRequestDTO, POSTExamRequestDTO } from "../dtos/external-connection.request.dto";
import { ExternalKeyService } from "../external-key/external-key.service";

@Injectable()
export class ExternalConnectionService {

    constructor(
        @Inject(ExternalKeyService) private readonly externalKeyService: ExternalKeyService,
        @Inject(ExamRepository) private readonly repository: ExamRepository
    ) { }

    /**
     * Creates an exam with the given options
     * @param param0 
     * @returns Exam
     */
    async create({ key, source, ...exam }: POSTExamRequestDTO & { source: string }): Promise<Exam> {
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
    async findOneOrCreate({ key, source, ...exam }: POSTExamRequestDTO & { source: string }): Promise<Exam> {
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
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHExamRequestDTO): Promise<Exam> {
        const foundExam = await this.repository.findOneAndUpdate({
            externalKey: {
                key: key,
                source: source
            }
        }, data);
        return foundExam;

    }
}