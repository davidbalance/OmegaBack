import { AbstractSendAttributeEntity } from "./send-attribute.entity";
import { AbstractRepository } from "../sql-database";

export class AbstractSendAttributeService<
    E extends AbstractSendAttributeEntity,
    R extends AbstractRepository<number, E>
> {
    constructor(
        private readonly _prRepository: R
    ) { }

    /**
     * Creates a send attribute
     * @param values 
     * @returns SendAttribute
     */
    async create(values: { value: string }): Promise<E> {
        const newKey = await this._prRepository.create(values as any);
        return newKey;
    }
}