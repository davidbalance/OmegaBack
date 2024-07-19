import { Inject, Injectable } from '@nestjs/common';
import { ExamSubtypeRepository } from '../repositories/exam-subtype.repository';
import { POSTExamSubtypeRequestDto } from '../dto/post.exam-subtype.dto';
import { ExamSubtype } from '../entities/exam-subtype.entity';
import { ExamTypeManagementService } from '@/laboratory/exam-type/services/exam-type-management.service';
import { PATCHExamSubtypeRequestDto } from '../dto/patch.exam-subtype.dto';
import { ExamType } from '@/laboratory/exam-type/entities/exam-type.entity';

@Injectable()
export class ExamSubtypeManagementService {

  constructor(
    @Inject(ExamSubtypeRepository) private readonly repository: ExamSubtypeRepository,
    @Inject(ExamTypeManagementService) private readonly typeService: ExamTypeManagementService
  ) { }

  async create({ type, ...data }: POSTExamSubtypeRequestDto): Promise<ExamSubtype> {
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

  async updateOne(id: number, { type, ...data }: PATCHExamSubtypeRequestDto): Promise<ExamSubtype> {
    const { type: currentType } = await this.repository.findOne({ where: { id } });
    let updateType: ExamType = currentType;
    if (!!type && currentType.id !== type) {
      updateType = await this.typeService.findOne(type);
    }
    const subtype = await this.repository.findOneAndUpdate({ id }, { ...data, type: updateType });
    return subtype;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
