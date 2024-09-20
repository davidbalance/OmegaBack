import { FileManagementService, GenericFile } from "@/shared/utils/bases/base.file-service";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReadStream } from "fs";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { fileResultPath } from "@/shared/utils";

@Injectable()
export class MedicalOrderFileManagementService implements FileManagementService<number> {

    constructor(
        @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
        @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
    ) { }

    async getFile(key: number): Promise<ReadStream> {
        const medicalOrder = await this.repository
            .query('order')
            .select('order.fileAddress', 'filepath')
            .where('order.id = :id', { id: key })
            .getRawOne<{ filepath: string }>();

        try {
            const file = await this.storage.readFile(medicalOrder.filepath);
            return file;
        } catch (error) {
            await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
            throw error;
        }
    }

    async getFilePath(key: number): Promise<string> {
        await this.getFile(key);
        const order = await this.repository
            .query('order')
            .select('order.fileAddress', 'filepath')
            .where('order.id = :id', { id: key })
            .getRawOne<{ filepath: string }>();
        return order.filepath;
    }

    async uploadFile(key: number, file: GenericFile): Promise<string> {
        const order = await this.repository.findOne({
            where: { id: key },
            select: {
                id: true,
                client: {
                    name: true,
                    lastname: true,
                    dni: true
                }
            },
            relations: {
                client: true
            }
        });
        if (!order) {
            throw new NotFoundException('Medical report not found to associate file');
        }
        const { client, ...currentOrder } = order;
        const filepath = fileResultPath({ dni: client.dni, order: currentOrder.id });
        const filename = `medical_order_${currentOrder.id.toString().padStart(9, '0')}`;

        try {
            const output = await this.storage.saveFile(file.buffer, '.pdf', filepath, filename);
            await this.repository.findOneAndUpdate({ id: key }, { fileAddress: output, hasFile: true });
            return output;
        } catch (error) {
            await this.repository.findOneAndUpdate({ id: key }, { fileAddress: null, hasFile: false });
            throw error;
        }
    }

    async removeFile(key: number): Promise<boolean> {
        try {
            const filepath = await this.getFilePath(key);
            await this.storage.deleteFile(filepath);
            await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
            return true;
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }

}