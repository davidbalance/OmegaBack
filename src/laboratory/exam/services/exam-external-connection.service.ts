import { Inject, Injectable } from "@nestjs/common";
import { Exam } from "../entities/exam.entity";
import { ExamRepository } from "../repositories/exam.repository";
import { ExamExternalKeyService } from "./exam-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PATCHExamRequestDto } from "../dtos/patch.exam.dto";
import { POSTExamExternalConnectionRequestDto, POSTExamRequestDto } from "../dtos/post.exam.dto";

type POSTRequest = POSTExamExternalConnectionRequestDto;
type RequestType = POSTRequest | PATCHExamRequestDto;

@Injectable()
export class ExamExternalConnectionService implements IExternalConnectionService<RequestType, Exam> {

    constructor(
        @Inject(ExamExternalKeyService) private readonly externalKeyService: ExamExternalKeyService,
        @Inject(ExamRepository) private readonly repository: ExamRepository
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<Exam> {
        throw new Error("Method not implemented.");
    }

    async create({ key, source, ...exam }: POSTExamExternalConnectionRequestDto): Promise<Exam> {
        const newKey = await this.externalKeyService.create({ key, source });
        try {
            const newExam = await this.repository.create({ ...exam, externalKey: newKey });
            return newExam;
        } catch (error) {
            await this.externalKeyService.remove({ source, key })
            throw error;
        }
    }

    async findOneOrCreate({ key, source, ...exam }: POSTRequest): Promise<Exam> {
        try {
            const foundExam = await this.repository.findOne({
                where: { externalKey: { key: key, source: source } }
            });
            return foundExam;
        } catch (error) {
            return this.create({ key, source, ...exam });
        }
    }

    async findOneAndUpdate(
        { key, source }: ExternalKeyParam,
        { ...data }: PATCHExamRequestDto
    ): Promise<Exam> {
        const foundExam = await this.repository.findOneAndUpdate({
            externalKey: { key: key, source: source }
        }, data);
        return foundExam;

    }
}