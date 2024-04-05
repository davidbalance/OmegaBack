import { Inject, Injectable } from '@nestjs/common';
import { AbstractExternalKeyService } from '@/shared';
import { CompanyExternalKey } from './entities/company-external-key.entity';
import { CompanyExternalKeyRepository } from './company-external-key.repository';
import { CompanyRepository } from '../company.repository';

@Injectable()
export class CompanyExternalKeyService extends AbstractExternalKeyService<CompanyExternalKey, CompanyExternalKeyRepository> {

  constructor(
    @Inject(CompanyExternalKeyRepository) private readonly repository: CompanyExternalKeyRepository
  ) {
     super(repository);
  }
}
