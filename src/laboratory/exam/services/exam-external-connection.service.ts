import { Inject, Injectable } from "@nestjs/common";
import { ExamRepository } from "../repositories/exam.repository";
import { ExamExternalKeyService } from "./exam-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostExamExternalRequestDto } from "../dtos/request/external-exam.post.dto";
import { INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-subtype/services/exam-subtype-external-connection.service";
import { INJECT_EXAM_TYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-type/services/exam-type-external-connection.service";
import { PatchExamExternalRequestDto } from "../dtos/request/external-exam.patch.dto";
import { ExtendedExam } from "../dtos/response/extended-exam.base.dto";
import { PostExamSubtypeRequestDto } from "@/laboratory/exam-subtype/dtos/request/exam-subtype.post.dto";
import { ExtendedExamSubtype } from "@/laboratory/exam-subtype/dtos/response/extended-exam-subtype.base.dto";
import { ExtendedExamType } from "@/laboratory/exam-type/dtos/response/extended-exam-type.base.dto";
import { PostExamTypeRequestDto } from "@/laboratory/exam-type/dtos/request/exam-type.post.dto";

type ConnectionRequestType = PostExamExternalRequestDto | PatchExamExternalRequestDto;

@Injectable()
export class ExamExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, ExtendedExam> {

    constructor(
        @Inject(ExamExternalKeyService) private readonly externalKeyService: ExamExternalKeyService,
        @Inject(ExamRepository) private readonly repository: ExamRepository,
        @Inject(INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION) private readonly subtypeService: IExternalConnectionService<PostExamSubtypeRequestDto, ExtendedExamSubtype>,
        @Inject(INJECT_EXAM_TYPE_EXTERNAL_CONNECTION) private readonly typeService: IExternalConnectionService<PostExamTypeRequestDto, ExtendedExamType>,
    ) { }

    async findOne(key: ExternalKeyParam | any): Promise<ExtendedExam> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, { type, subtype, ...data }: PostExamExternalRequestDto): Promise<ExtendedExam> {
        let foundType: ExtendedExamType;
        if (type) {
            const { key: typeKey, ...typeData } = type;
            foundType = await this.typeService.findOneOrCreate({ key: typeKey, source: key.source }, { ...typeData });
        } else {
            foundType = await this.typeService.findOneOrCreate({ key: key.source, source: key.source }, { name: 'default' });
        }
        let foundSubtype: ExtendedExamSubtype;
        if (subtype) {
            const { key: subtypeKey, ...subtypeData } = subtype;
            foundSubtype = await this.subtypeService.findOneOrCreate({ source: key.source, key: subtypeKey }, { ...subtypeData, type: foundType.id });
        } else {
            foundSubtype = await this.subtypeService.findOneOrCreate({ source: key.source, key: key.source }, { name: 'default', type: foundType.id });
        }

        const newKey = await this.externalKeyService.create(key);
        try {
            const newExam = await this.repository.create({ ...data, externalKey: newKey, subtype: { id: foundSubtype.id } });
            return newExam;
        } catch (error) {
            await this.externalKeyService.remove(key);
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam | any, body: PostExamExternalRequestDto): Promise<ExtendedExam> {
        try {
            const foundExam = await this.repository.findOne({
                where: { externalKey: key }
            });
            return foundExam;
        } catch (error) {
            return this.create(key, body);
        }
    }

    async findOneAndUpdate(key: ExternalKeyParam, data: PatchExamExternalRequestDto): Promise<ExtendedExam> {
        const foundExam = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return foundExam;
    }
}