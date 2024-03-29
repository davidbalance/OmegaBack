import { Inject, Injectable } from '@nestjs/common';
import { ResultRepository } from './result.repository';
import { FindResult } from '../common/dtos';

interface FindResultParams {
  exam?: number;
  morbidity?: number;
  doctor?: number;
}

@Injectable()
export class ResultService {

  constructor(
    @Inject(ResultRepository) private readonly repository: ResultRepository
  ) { }

  async findResultsByDoctor(doctor: number): Promise<FindResult[]> {
    const results = await this.repository.find({
      where: { doctor: doctor },
      select: {
        id: true,
        examName: true,
        morbidity: true,
        address: true,
        report: {
          address: true
        }
      }
    });

    return results;
  }

}
