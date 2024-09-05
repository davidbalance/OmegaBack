import { Inject, Injectable } from '@nestjs/common';
import { Branch } from '../entities/branch.entity';
import { BranchRepository } from '../repositories/branch.repository';
import { BranchSingleResponseDto } from '../dtos/response/base.branch-single.response.dto';

@Injectable()
export class BranchManagementService {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { }

  async find(company: number): Promise<BranchSingleResponseDto[]> {
    const branches = await this.repository.query('branch')
      .leftJoinAndSelect('branch.city', 'city')
      .leftJoinAndSelect('branch.company', 'company')
      .select('branch.id', 'id')
      .select('branch.name', 'name')
      .select('city.name', 'city')
      .where('company.id = :id', { id: company })
      .getRawMany<BranchSingleResponseDto>();
    return branches;
  }

  async findByCompanyRuc(company: string): Promise<Branch[]> {
    const branches = await this.repository.find({
      where: {
        company: { ruc: company },
        status: true,
      },
      select: {
        id: true,
        name: true,
        city: { name: true },
        company: {
          corporativeGroup: { name: true },
          address: true,
          name: true,
          ruc: true,
          phone: true
        },
      }
    });
    return branches;
  }
}
