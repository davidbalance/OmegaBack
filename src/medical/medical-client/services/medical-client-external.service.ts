import { Inject, Injectable } from '@nestjs/common';
import { MedicalClient } from '../entities/medical-client.entity';
import { IExternalConnectionService } from '@/shared/utils/bases/base.external-connection';
import { MedicalClientManagementService } from './medical-client-management.service';
import { PatchMedicalClientRequestDto } from '../dtos/request/patch.medical-client.request.dto';
import { MedicalClientEventService } from './medical-client-event.service';
import { PostMedicalClientExternalRequestDto } from '../dtos/request/post.medical-client-external.request.dto';
import { MedicalClientJobPositionService } from './medical-client-job-position.service';
import { MedicalClientEmailService } from './medical-client-email.service';

type ConnectionRequestType = PostMedicalClientExternalRequestDto | PatchMedicalClientRequestDto;

@Injectable()
export class MedicalClientExternalService implements IExternalConnectionService<ConnectionRequestType, MedicalClient> {

  constructor(
    @Inject(MedicalClientManagementService) private readonly managementService: MedicalClientManagementService,
    @Inject(MedicalClientEmailService) private readonly emailService: MedicalClientEmailService,
    @Inject(MedicalClientJobPositionService) private readonly jobPositionService: MedicalClientJobPositionService,
    @Inject(MedicalClientEventService) private readonly eventService: MedicalClientEventService,
  ) { }

  async create(source: string, { jobPosition, ...data }: PostMedicalClientExternalRequestDto): Promise<MedicalClient> {
    await this.managementService.create(data);
    await this.emailService.assignEmail(data.dni, { email: data.email });
    const client = await this.jobPositionService.assignJobPosition(data.dni, { jobPositionName: jobPosition.name });
    this.eventService.emitExternalCreateEvent(source, data, jobPosition);
    return client;
  }

  async findOne(dni: string): Promise<MedicalClient> {
    return this.managementService.findOneByDni(dni);
  }

  async findOneOrCreate(source: string, body: PostMedicalClientExternalRequestDto): Promise<MedicalClient> {
    try {
      return await this.managementService.findOneByDni(body.dni);
    } catch (error) {
      return this.create(source, body);
    }
  }

  async findOneAndUpdate(dni: string, body: PatchMedicalClientRequestDto): Promise<MedicalClient> {
    return this.managementService.updateOne(dni, body);
  }
}
