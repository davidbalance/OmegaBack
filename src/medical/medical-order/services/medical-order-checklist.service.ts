import { Inject, Injectable } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderEntity } from "../entities/medical-order.entity";

@Injectable()
export class MedicalOrderChecklistService {
    constructor(
        @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
    ) { }

    async findOne(id: number): Promise<MedicalOrderEntity> {
        return this.repository.findOne({
            where: { id: id },
            select: {
                id: true,
                companyRuc: true,
                companyName: true,
                createAt: true,
                process: true,
                client: {
                    name: true,
                    lastname: true,
                    dni: true,
                    jobPositionName: true
                },
            },
            relations: {
                results: true
            }
        });
    }
}