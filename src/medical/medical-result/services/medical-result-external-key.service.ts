import { AbstractExternalKeyService } from "@/shared/external-key";
import { Injectable, Inject } from "@nestjs/common";
import { MedicalResultExternalKey } from "../entities/medical-result-external-key.entity";
import { MedicalResultExternalKeyRepository } from "../repositories/medical-result-external-key.respository";

@Injectable()
export class MedicalResultExternalKeyService extends AbstractExternalKeyService<MedicalResultExternalKey, MedicalResultExternalKeyRepository> {
  constructor(
    @Inject(MedicalResultExternalKeyRepository) private readonly repository: MedicalResultExternalKeyRepository
  ) {
    super(repository);
  }
}
