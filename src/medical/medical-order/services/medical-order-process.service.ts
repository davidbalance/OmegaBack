import { Inject, Injectable } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";

@Injectable()
export class MedicalOrderProcessService {

    constructor(
        @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
    ) { }

    public async retriveProcesses(): Promise<string[]> {
        const value = await this.repository.query('order')
            .select('order.process', 'process')
            .distinct(true)
            .getRawMany<{ process: string }>();
        const processSet = new Set(value.map(e => e.process));
        return Array.from(processSet);
    }
}