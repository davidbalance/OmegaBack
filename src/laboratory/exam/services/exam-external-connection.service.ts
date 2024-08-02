import { Inject, Injectable } from "@nestjs/common";
import { Exam } from "../entities/exam.entity";
import { ExamRepository } from "../repositories/exam.repository";
import { ExamExternalKeyService } from "./exam-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostExamExternalRequestDto } from "../dtos/request/post.exam-external.request.dto";
import { INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-subtype/services/exam-subtype-external-connection.service";
import { PostExamSubtypeRequestDto } from "@/laboratory/exam-subtype/dtos/request/post.exam-subtype.dto";
import { ExamSubtype } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";
import { INJECT_EXAM_TYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-type/services/exam-type-external-connection.service";
import { PostExamTypeRequestDto } from "@/laboratory/exam-type/dtos/request/post.exam-type.dto";
import { ExamType } from "@/laboratory/exam-type/entities/exam-type.entity";
import { PatchExamExternalRequestDto } from "../dtos/request/patch.exam-external.request.dto";

type ConnectionRequestType = PostExamExternalRequestDto | PatchExamExternalRequestDto;

@Injectable()
export class ExamExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, Exam> {

    constructor(
        @Inject(ExamExternalKeyService) private readonly externalKeyService: ExamExternalKeyService,
        @Inject(ExamRepository) private readonly repository: ExamRepository,
        @Inject(INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION) private readonly subtypeService: IExternalConnectionService<PostExamSubtypeRequestDto, ExamSubtype>,
        @Inject(INJECT_EXAM_TYPE_EXTERNAL_CONNECTION) private readonly typeService: IExternalConnectionService<PostExamTypeRequestDto, ExamType>,
    ) { }

    async findOne(key: ExternalKeyParam | any): Promise<Exam> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, { type, subtype, ...data }: PostExamExternalRequestDto): Promise<Exam> {
        const { key: typeKey, ...typeData } = type;
        let foundType = await this.typeService.findOneOrCreate({ key: typeKey, source: key.source }, typeData);
        let foundSubtype: ExamSubtype;
        if (subtype) {
            const { key: subtypeKey, ...subtypeData } = subtype;
            foundSubtype = await this.subtypeService.findOneOrCreate({ source: key.source, key: subtypeKey }, { ...subtypeData, type: foundType.id });
        } else {
            foundSubtype = await this.subtypeService.findOneOrCreate({ source: key.source, key: key.source }, { name: 'default', type: foundType.id });
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

    async findOneAndUpdate(key: ExternalKeyParam, data: PatchExamExternalRequestDto): Promise<Exam> {
        const foundExam = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return foundExam;
    }
}