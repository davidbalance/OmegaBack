import { Inject, Injectable, Provider } from '@nestjs/common';
import { ExamTypeRepository } from '../repositories/exam-type.repository';
import { ExamType } from '../entities/exam-type.entity';
import { PostExamTypeRequestDto } from '../dtos/request/post.exam-type.dto';
import { PatchExamTypeRequestDto } from '../dtos/request/patch.exam-type.dto';
import { ExternalKeyParam, IExternalConnectionService } from '@/shared/utils/bases/base.external-connection';
import { ExamTypeExternalKeyService } from './exam-type-external-key.service';

type ConnectionRequestType = PostExamTypeRequestDto | PatchExamTypeRequestDto;

@Injectable()
export class ExamTypeExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, ExamType> {

  constructor(
    @Inject(ExamTypeRepository) private readonly repository: ExamTypeRepository,
    @Inject(ExamTypeExternalKeyService) private readonly externalkey: ExamTypeExternalKeyService,

  ) { }

  findOne(key: ExternalKeyParam | any): Promise<ExamType> {
    throw new Error('Method not implemented.');
  }

  async create(key: ExternalKeyParam, data: PostExamTypeRequestDto): Promise<ExamType> {
    const newKey = await this.externalkey.create(key);
    try {
      const newExam = await this.repository.create({ ...data, externalKey: newKey });
      return newExam;
    } catch (error) {
      await this.externalkey.remove(key);
      throw error;
    }
  }

  async findOneOrCreate(key: ExternalKeyParam | any, body: PostExamTypeRequestDto): Promise<ExamType> {
    try {
      const foundExam = await this.repository.findOne({
        where: [
          { externalKey: key },
          { name: body.name }
        ]
      });
      return foundExam;
    } catch (error) {
      return this.create(key, body);
    }
  }

  async findOneAndUpdate(key: ExternalKeyParam | any, data: PatchExamTypeRequestDto): Promise<ExamType> {
    const foundExam = await this.repository.findOneAndUpdate({ externalKey: key }, data);
    return foundExam;
  }
}

export const INJECT_EXAM_TYPE_EXTERNAL_CONNECTION = 'INJECT_EXAM_TYPE_EXTERNAL_CONNECTION';
export const ExamTypeExternalConnectionProvider: Provider = { provide: INJECT_EXAM_TYPE_EXTERNAL_CONNECTION, useClass: ExamTypeExternalConnectionService }