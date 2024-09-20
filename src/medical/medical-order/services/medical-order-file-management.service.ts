import { FileManagementService, GenericFile } from "@/shared/utils/bases/base.file-service";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReadStream } from "fs";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { fileResultPath } from "@/shared/utils";
import { Base64Service } from "@/shared/base64/base64.service";
import { fileExtension } from "@/shared/utils/file-extension";
import { v4 } from "uuid";

@Injectable()
export class MedicalOrderFileManagementService implements FileManagementService<number> {

    constructor(
        @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
        @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
        @Inject(Base64Service) private readonly base64: Base64Service,
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

    async uploadFromBase64(key: number, mimetype: string, base64: string): Promise<string> {
        const buffer = this.base64.toBuffer(base64);
        const extension = fileExtension(mimetype);
        const filename = `${v4()}${extension}`;
        return await this.uploadFile(key, { originalname: filename, mimetype: mimetype, buffer });
    }


    async uploadFile(key: number, file: GenericFile): Promise<string> {
        const order = await this.repository
            .query('order')
            .leftJoin('order.client', 'client')
            .select('order.id', 'id')
            .addSelect('client.dni', 'dni')
            .getRawOne<{ id: number, dni: string }>();

        if (!order) {
            throw new NotFoundException('Medical report not found to associate file');
        }
        const { id, dni } = order;
        const filepath = fileResultPath({ dni: dni, order: id });
        const filename = `medical_order_${id.toString().padStart(9, '0')}`;

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