import { Inject, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchRepository } from './branch.repository';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { }

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    return await this.repository.create(createBranchDto);
  }

  async readAll(): Promise<Branch[]> {
    return await this.repository.find({ status: true });
  }

  async readOneByID(id: number): Promise<Branch> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    return await this.repository.findOneAndUpdate({ id }, updateBranchDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
