import { Inject, Injectable } from "@nestjs/common";
import { Exam } from "../entities/exam.entity";
import { ExamRepository } from "../repositories/exam.repository";
import { ExamExternalKeyService } from "./exam-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostExamExternalRequestDto } from "../dtos/request/post.exam-external.request.dto";
import { PatchExamRequestDto } from "../dtos/request/patch.exam.request.dto";
import { INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-subtype/services/exam-subtype-external-connection.service";
import { PostExamSubtypeRequestDto } from "@/laboratory/exam-subtype/dto/request/post.exam-subtype.dto";
import { ExamSubtype } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";
import { INJECT_EXAM_TYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-type/services/exam-type-external-connection.service";
import { PostExamTypeRequestDto } from "@/laboratory/exam-type/dtos/request/post.exam-type.dto";

type ConnectionRequestType = PostExamExternalRequestDto | PatchExamRequestDto;

@Injectable()
export class ExamExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, Exam> {

    constructor(
        @Inject(ExamExternalKeyService) private readonly externalKeyService: ExamExternalKeyService,
        @Inject(ExamRepository) private readonly repository: ExamRepository,
        @Inject(INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION) private readonly subtypeService: IExternalConnectionService<PostExamSubtypeRequestDto, ExamSubtype>,
        @Inject(INJECT_EXAM_TYPE_EXTERNAL_CONNECTION) private readonly typeService: IExternalConnectionService<PostExamTypeRequestDto, ExamSubtype>,
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<Exam> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, { type, subtype, ...data }: PostExamExternalRequestDto): Promise<Exam> {
        let foundType = await this.typeService.findOneOrCreate(key, type);
        let foundSubtype: ExamSubtype;
        if (subtype) {
            foundSubtype = await this.subtypeService.findOneOrCreate(key, { ...subtype, type: foundType.id });
        } else {
            foundSubtype = await this.subtypeService.findOneOrCreate(key, { name: 'default', type: foundType.id });
        }

        const newKey = await this.externalKeyService.create(key);
        try {
            const newExam = await this.repository.create({ ...data, externalKey: newKey, subtype: foundSubtype });
            return newExam;
        } catch (error) {
            await this.externalKeyService.remove(key);
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam | any, body: PostExamExternalRequestDto): Promise<Exam> {
        try {
            const foundExam = await this.repository.findOne({
                where: { externalKey: key }
            });
            return foundExam;
        } catch (error) {
            return this.create(key, body);
        }
    }

    async findOneAndUpdate(key: ExternalKeyParam, data: PatchExamRequestDto): Promise<Exam> {
        const foundExam = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return foundExam;
    }
}