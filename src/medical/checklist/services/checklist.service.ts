import { Inject, Injectable } from '@nestjs/common';
import { MedicalOrderChecklistService } from '../../medical-order/services/medical-order-checklist.service';
import { MedicalResultManagementService } from '../../medical-result/services/medical-result-management.service';
import { MedicalResult } from '../../medical-result/dtos/response/medical-result.base.dto';
import { Checklist } from '../dto/response/checklist.base.dto';
import { checklistLayout } from '../utils/checklist-layout';
import { PdfManagerService } from '@/shared/pdf-manager/pdf-manager.service';
import { NEST_PATH } from '@/shared/nest-ext/path/inject-token';
import { FS } from '@/shared/nest-ext/fs/fs.type';
import { Path } from '@/shared/nest-ext/path/path.type';
import { NEST_FS } from '@/shared/nest-ext/fs/inject-token';

@Injectable()
export class ChecklistService {

    constructor(
        @Inject(MedicalOrderChecklistService) private readonly service: MedicalOrderChecklistService,
        @Inject(MedicalResultManagementService) private readonly exam: MedicalResultManagementService,
        @Inject(PdfManagerService) private readonly pdf: PdfManagerService,
        @Inject(NEST_PATH) private readonly path: Path,
        @Inject(NEST_FS) private readonly fs: FS,
    ) { }

    async findOne(id: number): Promise<Checklist> {
        const order = await this.service.findOne(id);
        return {
            clientName: order.client.name,
            clientLastname: order.client.lastname,
            clientDni: order.client.dni,
            jobPosition: order.client.jobPositionName,
            process: order.process,
            companyName: order.companyName,
            companyRuc: order.companyRuc,
            createAt: order.createAt,
            exams: order.results
        }
    }

    async updateItemStatus(id: number, status: boolean): Promise<MedicalResult> {
        return this.exam.updateOne(id, { checklistStatus: status })
    }

    async download(id: number): Promise<Buffer> {
        const checklist = await this.service.findOne(id);
        const data: Checklist = {
            clientName: checklist.client.name,
            clientLastname: checklist.client.lastname,
            clientDni: checklist.client.dni,
            jobPosition: checklist.client.jobPositionName,
            process: checklist.process,
            companyName: checklist.companyName,
            companyRuc: checklist.companyRuc,
            createAt: checklist.createAt,
            exams: checklist.results
        }

        const path = this.path.resolve('static/images/omega-variant.png');
        const imgBuffer = this.fs.readFileSync(path);
        const logo = `data:image/png;base64,${imgBuffer.toString('base64')}`;
        const layout = checklistLayout(data, logo);

        const buffer = await this.pdf.craft(layout);
        return buffer;
    }
}
