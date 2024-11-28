import { Inject, Injectable } from '@nestjs/common';
import { MedicalResultManagementService } from '@/medical/medical-result/services/medical-result-management.service';
import { MedicalOrderManagementService } from '@/medical/medical-order/services/medical-order-management.service';
import { LocalMedicalResultOrderRequestDto } from '../dtos/request/local-medical-result-order.base.dto';
import { MedicalResult } from '@/medical/medical-result/dtos/response/medical-result.base.dto';

@Injectable()
export class MedicalOrderResultLocalService {

    constructor(
        @Inject(MedicalOrderManagementService) private readonly orderService: MedicalOrderManagementService,
        @Inject(MedicalResultManagementService) private readonly resultService: MedicalResultManagementService,
    ) { }

    async create({ results, ...order }: LocalMedicalResultOrderRequestDto) {
        const newOrder = await this.orderService.create(order);
        const currentResults: MedicalResult[] = [];

        for (const result of results) {
            const newResult = await this.resultService.create({ order: newOrder.id, ...result });
            currentResults.push(newResult);
        }
        return { ...order, results: currentResults };
    }
}
