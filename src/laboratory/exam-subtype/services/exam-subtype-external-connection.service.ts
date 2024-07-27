import { Inject, Injectable, NotFoundException, Provider } from '@nestjs/common';
import { ExamSubtypeRepository } from '../repositories/exam-subtype.repository';
import { ExamTypeManagementService } from '@/laboratory/exam-type/services/exam-type-management.service';
import { ExamSubtype } from '../entities/exam-subtype.entity';
import { ExternalKeyParam, IExternalConnectionService } from '@/shared/utils/bases/base.external-connection';
import { PatchExamSubtypeRequestDto } from '../dto/request/patch.exam-subtype.dto';
import { PostExamSubtypeRequestDto } from '../dto/request/post.exam-subtype.dto';
import { ExamSubtypeExternalKeyService } from './exam-subtype-external-key.service';
import { PatchExamSubtypeExternalRequestDto } from '../dto/request/patch.exam-subtype-external.dto';

type ConnectionRequestType = PostExamSubtypeRequestDto | PatchExamSubtypeRequestDto;

@Injectable()
export class ExamSubtypeExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, ExamSubtype> {

  constructor(
    @Inject(ExamSubtypeRepository) private readonly repository: ExamSubtypeRepository,
    @Inject(ExamSubtypeExternalKeyService) private readonly externalkey: ExamSubtypeExternalKeyService,
    @Inject(ExamTypeManagementService) private readonly typeService: ExamTypeManagementService,
  ) { }

  findOne(key: ExternalKeyParam | any): Promise<ExamSubtype> {
    throw new Error('Method not implemented.');
  }

  async create(key: ExternalKeyParam, { type, ...data }: PostExamSubtypeRequestDto): Promise<ExamSubtype> {
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

  async findOneOrCreate(key: ExternalKeyParam, body: PostExamSubtypeRequestDto): Promise<ExamSubtype> {
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

  async findOneAndUpdate(key: ExternalKeyParam, data: PatchExamSubtypeExternalRequestDto): Promise<ExamSubtype> {
    const foundExam = await this.repository.findOneAndUpdate({ externalKey: key }, data);
    return foundExam;
  }

}

export const INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION = 'INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION';
export const ExamSubtypeExternalConnectionProvider: Provider = { provide: INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION, useClass: ExamSubtypeExternalConnectionService }


