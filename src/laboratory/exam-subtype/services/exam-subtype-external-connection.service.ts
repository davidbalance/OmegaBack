import { Inject, Injectable, NotFoundException, Provider } from '@nestjs/common';
import { ExamSubtypeRepository } from '../repositories/exam-subtype.repository';
import { ExamTypeManagementService } from '@/laboratory/exam-type/services/exam-type-management.service';
import { ExternalKeyParam, IExternalConnectionService } from '@/shared/utils/bases/base.external-connection';
import { PatchExamSubtypeRequestDto } from '../dtos/request/exam-subtype.patch.dto';
import { PostExamSubtypeRequestDto } from '../dtos/request/exam-subtype.post.dto';
import { ExamSubtypeExternalKeyService } from './exam-subtype-external-key.service';
import { PatchExamSubtypeExternalRequestDto } from '../dtos/request/external-exam-subtype.patch.dto';
import { ExtendedExamSubtype } from '../dtos/response/extended-exam-subtype.base.dto';

type ConnectionRequestType = PostExamSubtypeRequestDto | PatchExamSubtypeRequestDto;

@Injectable()
export class ExamSubtypeExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, ExtendedExamSubtype> {

  constructor(
    @Inject(ExamSubtypeRepository) private readonly repository: ExamSubtypeRepository,
    @Inject(ExamSubtypeExternalKeyService) private readonly externalkey: ExamSubtypeExternalKeyService,
    @Inject(ExamTypeManagementService) private readonly typeService: ExamTypeManagementService,
  ) { }

  async findOne(key: ExternalKeyParam | any): Promise<ExtendedExamSubtype> {
    throw new Error('Method not implemented.');
  }

  async create(key: ExternalKeyParam, { type, ...data }: PostExamSubtypeRequestDto): Promise<ExtendedExamSubtype> {
    const foundType = await this.typeService.findOne(type);
    if (!foundType) throw new NotFoundException('Exam type not created');
    const newKey = await this.externalkey.create(key);
    try {
      const newExam = await this.repository.create({ ...data, externalKey: newKey, type: foundType });
      return newExam;
    } catch (error) {
      await this.externalkey.remove(key);
      throw error;
    }
  }

  async findOneOrCreate(key: ExternalKeyParam, body: PostExamSubtypeRequestDto): Promise<ExtendedExamSubtype> {
    try {
      const foundExam = await this.repository.findOne({
        where: [
          { externalKey: key },
          {
            type: { id: body.type },
            name: body.name
          }
        ]
      });
      return foundExam;
    } catch (error) {
      return this.create(key, body);
    }
  }

  async findOneAndUpdate(key: ExternalKeyParam, data: PatchExamSubtypeExternalRequestDto): Promise<ExtendedExamSubtype> {
    const foundExam = await this.repository.findOneAndUpdate({ externalKey: key }, data);
    return foundExam;
  }

}

export const INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION = 'INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION';
export const ExamSubtypeExternalConnectionProvider: Provider = { provide: INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION, useClass: ExamSubtypeExternalConnectionService }


