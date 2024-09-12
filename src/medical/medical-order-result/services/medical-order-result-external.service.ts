import { ExternalKeyParam, IExternalConnectionService } from '@/shared/utils/bases/base.external-connection';
import { Inject, Injectable } from '@nestjs/common';
import { ExternalMedicalOrderRequestDto } from '../../medical-order/dtos/request/external-medical-order.base.dto';
import { ExternalMedicalOrder } from '../../medical-order/dtos/response/external-medical-order.base.dto';
import { INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION } from '../../medical-order/services/medical-order-external-connection.service';
import { ExternalMedicalResult } from '../../medical-result/dtos/response/external-medical-result.base.dto';
import { ExternalMedicalResultRequestDto } from '../../medical-result/dtos/request/external-medical-result.base.dto';
import { INJECT_MEDICAL_RESULT_EXTERNAL_CONNECTION } from '../../medical-result/services/medical-result-external-connection.service';
import { ExternalMedicalResultOrderRequestDto } from '../dtos/request/external-medical-result-order.base.dto';

type RequestType = ExternalMedicalResultOrderRequestDto

@Injectable()
export class MedicalOrderResultExternalService implements IExternalConnectionService<RequestType, ExternalMedicalOrder> {

    constructor(
        @Inject(INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION) private readonly orderService: IExternalConnectionService<ExternalMedicalOrderRequestDto, ExternalMedicalOrder>,
        @Inject(INJECT_MEDICAL_RESULT_EXTERNAL_CONNECTION) private readonly resultService: IExternalConnectionService<ExternalMedicalResultRequestDto, ExternalMedicalResult>,
    ) { }

    async create(key: ExternalKeyParam, { results, ...order }: ExternalMedicalResultOrderRequestDto): Promise<ExternalMedicalOrder> {
        const foundOrder = await this.orderService.findOneOrCreate(key, order);
        const createdResults: ExternalMedicalResult[] = [];
        for (const { key: resultKey, ...resultData } of results) {
            const result = await this.resultService.create({ ...key, key: resultKey }, {
                ...resultData,
                order: { ...order, key: key.key }
            });
            createdResults.push(result);
        }
        const currentResults = foundOrder.results || [];
        const data = { ...foundOrder, results: [...currentResults, ...createdResults] };
        return data;
    }

    findOne(key: ExternalKeyParam | any): Promise<ExternalMedicalOrder> {
        throw new Error('Method not implemented.');
    }

    findOneOrCreate(key: ExternalKeyParam | any, body: ExternalMedicalResultOrderRequestDto): ExternalMedicalOrder | Promise<ExternalMedicalOrder> {
        throw new Error('Method not implemented.');
    }

    findOneAndUpdate(key: ExternalKeyParam | any, body: ExternalMedicalResultOrderRequestDto): ExternalMedicalOrder | Promise<ExternalMedicalOrder> {
        throw new Error('Method not implemented.');
    }
}
