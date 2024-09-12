import { AbstractExternalKeyService } from "@/shared/external-key";
import { Injectable, Inject } from "@nestjs/common";
import { MedicalResultExternalKeyEntity } from "../entities/medical-result-external-key.entity";
import { MedicalResultExternalKeyRepository } from "../repositories/medical-result-external-key.respository";

@Injectable()
export class MedicalResultExternalKeyService
  extends AbstractExternalKeyService<MedicalResultExternalKeyEntity, MedicalResultExternalKeyRepository> {
  constructor(
    @Inject(MedicalResultExternalKeyRepository) private readonly repository: MedicalResultExternalKeyRepository
  ) {
    super(repository);
  }
}
