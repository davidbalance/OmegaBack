import { Inject, Injectable } from "@nestjs/common";
import { Exam } from "../entities/exam.entity";
import { ExamRepository } from "../exam.repository";
import { ExternalKeyService } from "../external-key/external-key.service";
import { PATCHExamRequestDto, POSTExamRequestDto } from "../dtos/exam.request.dto";

@Injectable()
export class ExternalConnectionService {

    constructor(
        @Inject(ExternalKeyService) private readonly externalKeyService: ExternalKeyService,
        @Inject(ExamRepository) private readonly repository: ExamRepository
    ) { }

    /**
     * Crea un examen medico.
     * @param param0 
     * @returns 
     */
    async create({ key, source, ...exam }: POSTExamRequestDto & { source: string }): Promise<Exam> {
        const newKey = await this.externalKeyService.create({ key, source });
        try {
            const newExam = await this.repository.create({
                ...exam,
                externalKey: newKey
            });
            return newExam;
        } catch (error) {
            this.externalKeyService.remove({ source, key })
            throw error;
        }
    }

    /**
     * Encuentra un examen medico si no existe lo crea.
     * @param param0 
     * @returns 
     */
    async findOneOrCreate({ key, source, ...exam }: POSTExamRequestDto & { source: string }): Promise<Exam> {
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
     * Encuentra un examen medico y lo modifica.
     * @param param0 
     * @param param1 
     * @returns 
     */
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHExamRequestDto): Promise<Exam> {
        console.log({
            externalKey: {
                key: key,
                source: source
            }
        });
        const foundExam = await this.repository.findOneAndUpdate({
            externalKey: {
                key: key,
                source: source
            }
        }, data);
        return foundExam;

    }
}