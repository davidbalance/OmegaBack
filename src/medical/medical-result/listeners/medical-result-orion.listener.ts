import { Inject, Injectable, Logger } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultEvent, OnMedicalResultUploadFileEvent } from "@/shared/events/medical-result.event";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class MedicalResultOrionListener {

    constructor(
        @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository
    ) { }

    @OnEvent(MedicalResultEvent.ON_UPLOAD_FILE)
    async findOneCredentialAndUpdateUsername({ id }: OnMedicalResultUploadFileEvent): Promise<void> {
        Logger.log(`Result to be done read ${id}`);
    }

}