import { Inject, Injectable } from "@nestjs/common";
import { MedicalResultSendAttribute } from "../entities/medical-result-send-attribute.entity";
import { MedicalResultSendAttributeRepository } from "../repositories/medical-result-send-attribute.repository";
import { AbstractSendAttributeService } from "@/shared/send-attribute/send-attribute.service";

@Injectable()
export class MedicalResultSendAttributeService
    extends AbstractSendAttributeService<MedicalResultSendAttribute, MedicalResultSendAttributeRepository> {

    constructor(
        @Inject(MedicalResultSendAttributeRepository) private readonly repository: MedicalResultSendAttributeRepository
    ) {
        super(repository);
    }
}
