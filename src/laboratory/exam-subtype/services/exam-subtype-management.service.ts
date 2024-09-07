import { Inject, Injectable } from '@nestjs/common';
import { ExamSubtypeRepository } from '../repositories/exam-subtype.repository';
import { ExamTypeManagementService } from '@/laboratory/exam-type/services/exam-type-management.service';
import { PostExamSubtypeRequestDto } from '../dtos/request/exam-subtype.post.dto';
import { PatchExamSubtypeRequestDto } from '../dtos/request/exam-subtype.patch.dto';
import { ExamSubtype } from '../dtos/response/exam-subtype.base.dto';

@Injectable()
export class ExamSubtypeManagementService {

  constructor(
    @Inject(ExamSubtypeRepository) private readonly repository: ExamSubtypeRepository,
    @Inject(ExamTypeManagementService) private readonly typeService: ExamTypeManagementService
  ) { }

  async create({ type, ...data }: PostExamSubtypeRequestDto): Promise<ExamSubtype> {
    const foundType = await this.typeService.findOne(type);
    const subtype = await this.repository.create({ ...data, type: foundType });
    return { ...subtype, type };
  }

  async findOne(id: number): Promise<ExamSubtype> {
    const subtype = await this.repository.findOne({ where: { id }, relations: { type: true } });
    return { ...subtype, type: subtype.type.id };
  }

  async hasExams(id: number): Promise<boolean> {
    const subtype = await this.repository.findOne({ where: { id }, relations: { exams: true } });
    return subtype.exams.length > 0;
  }

  async updateOne(id: number, { type, ...data }: PatchExamSubtypeRequestDto): Promise<ExamSubtype> {
    const foundSubtype = await this.repository.findOne({ where: { id: id } });
    let newType: any | undefined = undefined;
    if (type !== undefined && type !== foundSubtype.id) {
      newType = await this.typeService.findOne(type);
    }
    const subtype = await this.repository.findOneAndUpdate({ id }, { ...data, type: newType });
    return { ...subtype, type: subtype.type.id };
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
