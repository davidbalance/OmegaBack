import { AbstractRepository } from "../sql-database/abstract.repository";
import { ExternalKeyEntity } from "./external-key.entity";

export abstract class AbstractExternalKeyService<
    E extends ExternalKeyEntity,
    R extends AbstractRepository<number, E>
> {
    constructor(
        private readonly _prRepository: R
    ) { }

    /**
     * Creates a new external key
     * @param key 
     * @returns External Key
     */
    async create(key: { source: string, key: string }): Promise<E> {
        const newKey = await this._prRepository.create(key as any);
        return newKey;
    }

    async remove(key: { source: string, key: string }): Promise<void> {
        try {
            await this._prRepository.findOneAndDelete({
                key: key.key as any,
                source: key.source as any
            });
        } catch (error) {
            throw error;
        }
    }
}