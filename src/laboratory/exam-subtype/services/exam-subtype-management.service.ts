import { Inject, Injectable } from '@nestjs/common';
import { ExamSubtypeRepository } from '../repositories/exam-subtype.repository';
import { ExamTypeManagementService } from '@/laboratory/exam-type/services/exam-type-management.service';
import { ExamType } from '@/laboratory/exam-type/entities/exam-type.entity';
import { ExamSubtype } from '../entities/exam-subtype.entity';
import { PostExamSubtypeRequestDto } from '../dtos/request/post.exam-subtype.dto';
import { PatchExamSubtypeRequestDto } from '../dtos/request/patch.exam-subtype.dto';

@Injectable()
export class ExamSubtypeManagementService {

  constructor(
    @Inject(ExamSubtypeRepository) private readonly repository: ExamSubtypeRepository,
    @Inject(ExamTypeManagementService) private readonly typeService: ExamTypeManagementService
  ) { }

  async create({ type, ...data }: PostExamSubtypeRequestDto): Promise<ExamSubtype> {
    const foundType = await this.typeService.findOne(type);
    const subtype = await this.repository.create({ ...data, type: foundType });
    return subtype;
  }

  async findAll(): Promise<ExamSubtype[]> {
    const subtypes = await this.repository.find({ where: { status: true } });
    return subtypes;
  }

  async findOne(id: number): Promise<ExamSubtype> {
    const subtype = await this.repository.findOne({ where: { id } });
    return subtype;
  }

  async updateOne(id: number, { type, ...data }: PatchExamSubtypeRequestDto): Promise<ExamSubtype> {
    const foundSubtype = await this.repository.findOne({ where: { id: id } });
    let newType: ExamType | undefined = undefined;
    if (type !== undefined && type !== foundSubtype.id) {
      newType = await this.typeService.findOne(type);
    }
    const subtype = await this.repository.findOneAndUpdate({ id }, { ...data, type: newType });
    return subtype;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
