import { ConflictException } from "@nestjs/common";
import { AbstractRepository } from "../sql-database";
import { ExternalKeyEntity } from "./external-key.entity";

export abstract class AbstractExternalKeyService<
    E extends ExternalKeyEntity,
    R extends AbstractRepository<number, E>
> {
    constructor(
        private readonly _prRepository: R
    ) { }

    async create(key: { source: string, key: string }): Promise<E> {
        try {
            await this._prRepository.findOne({
                where: {
                    key: key.key as any,
                    source: key.source as any
                }
            });
            throw new ConflictException(JSON.stringify(key), 'Already exists a value with this source and key')
        } catch (error) {
            const newKey = await this._prRepository.create(key as any);
            return newKey;
        }
    }
}