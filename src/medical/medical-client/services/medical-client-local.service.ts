import { Inject, Injectable } from '@nestjs/common';
import { MedicalClientManagementService } from './medical-client-management.service';
import { MedicalClientEventService } from './medical-client-event.service';
import { MedicalClient } from '../dtos/response/medical-client.base.dto';
import { MedicalClientEmailService } from './medical-client-email.service';
import { MedicalClientJobPositionService } from './medical-client-job-position.service';
import { PostLocalMedicalClientRequestDto } from '../dtos/request/local-medical-client.post.dto';

@Injectable()
export class MedicalClientLocalService {

    constructor(
        @Inject(MedicalClientManagementService) private readonly managementService: MedicalClientManagementService,
        @Inject(MedicalClientEmailService) private readonly emailService: MedicalClientEmailService,
        @Inject(MedicalClientEventService) private readonly eventService: MedicalClientEventService,
        @Inject(MedicalClientJobPositionService) private readonly jobPositionService: MedicalClientJobPositionService,
    ) { }

    async create({ jobPosition, ...data }: PostLocalMedicalClientRequestDto): Promise<MedicalClient> {
        const newClient = await this.managementService.create(data);
        await this.emailService.assignEmail(data.dni, { email: data.email });
        let newPosition = undefined;
        if (jobPosition) {
            newPosition = await this.jobPositionService.assignJobPosition(data.dni, { jobPositionName: jobPosition.name });
        }
        this.eventService.emitLocalCreateEvent(data, jobPosition);
        return { ...newClient, ...newPosition };
    }
}
