import { Inject, Injectable } from '@nestjs/common';
import { BranchRepository } from '../branch.repository';
import { Branch } from '../entities/branch.entity';

@Injectable()
export class BranchService {

  constructor(
    @Inject(BranchRepository) private readonly repository: BranchRepository
  ) { }

  async find(company: number): Promise<Branch[]> {
    const branches = await this.repository.find({
      where: {
        company: { id: company },
        status: true,
      },
      select: {
        id: true,
        name: true,
        city: { name: true },
        company: {
          corporativeGroup: {
            name: true
          },
          address: true,
          name: true,
          ruc: true,
          phone: true
        },
      }
    });
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
          corporativeGroup: {
            name: true
          },
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
