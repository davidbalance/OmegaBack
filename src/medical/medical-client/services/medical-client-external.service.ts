import { Inject, Injectable } from '@nestjs/common';
import { IExternalConnectionService } from '@/shared/utils/bases/base.external-connection';
import { MedicalClientManagementService } from './medical-client-management.service';
import { MedicalClientEventService } from './medical-client-event.service';
import { MedicalClientJobPositionService } from './medical-client-job-position.service';
import { MedicalClientEmailService } from './medical-client-email.service';
import { MedicalClient } from '../dtos/response/medical-client.base.dto';
import { PostExternalMedicalClientRequestDto } from '../dtos/request/external-medical-client.post.dto';
import { PatchExternalMedicalClientRequestDto } from '../dtos/request/external-medical-client.patch.dto';

type ConnectionRequestType = PostExternalMedicalClientRequestDto | PatchExternalMedicalClientRequestDto;

@Injectable()
export class MedicalClientExternalService implements IExternalConnectionService<ConnectionRequestType, MedicalClient> {

  constructor(
    @Inject(MedicalClientManagementService) private readonly managementService: MedicalClientManagementService,
    @Inject(MedicalClientEmailService) private readonly emailService: MedicalClientEmailService,
    @Inject(MedicalClientJobPositionService) private readonly jobPositionService: MedicalClientJobPositionService,
    @Inject(MedicalClientEventService) private readonly eventService: MedicalClientEventService,
  ) { }

  async create(source: string, { jobPosition, ...data }: PostExternalMedicalClientRequestDto): Promise<MedicalClient> {
    const newClient = await this.managementService.create(data);
    await this.emailService.assignEmail(data.dni, { email: data.email });
    const newPosition = await this.jobPositionService.assignJobPosition(data.dni, { jobPositionName: jobPosition.name });
    this.eventService.emitExternalCreateEvent(source, data, jobPosition);
    return {...newClient, ...newPosition};
  }

  async findOne(dni: string): Promise<MedicalClient> {
    return this.managementService.findOneByDni(dni);
  }

  async findOneOrCreate(source: string, body: PostExternalMedicalClientRequestDto): Promise<MedicalClient> {
    try {
      return await this.managementService.findOneByDni(body.dni);
    } catch (error) {
      return this.create(source, body);
    }
  }

  async findOneAndUpdate(dni: string, body: PatchExternalMedicalClientRequestDto): Promise<MedicalClient> {
    return this.managementService.updateOne(dni, body);
  }
}
