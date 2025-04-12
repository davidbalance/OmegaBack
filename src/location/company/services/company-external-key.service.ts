import { AbstractExternalKeyService } from "@/shared/external-key";
import { Injectable, Inject } from "@nestjs/common";
import { CompanyExternalKey } from "../entities/company-external-key.entity";
import { CompanyExternalKeyRepository } from "../repositories/company-external-key.repository";

@Injectable()
export class CompanyExternalKeyService
  extends AbstractExternalKeyService<CompanyExternalKey, CompanyExternalKeyRepository> {

  constructor(
    @Inject(CompanyExternalKeyRepository) private readonly repository: CompanyExternalKeyRepository
  ) {
    super(repository);
  }
}
