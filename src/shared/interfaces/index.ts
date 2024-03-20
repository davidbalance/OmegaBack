/**
 * Signature to update entity status
 * @template K Primary key
 * @template M Entity
 */
export interface RepositoryUpdateStatusExtension<K, M> {
    findOneAndUpdateStatus(id: K, status: boolean): Promise<M>
}

/**
 * Interface for data creation
 * @template E Entity that must be returned
 */
export interface FindOneOrCreateService<E> {
    /**
     * Returns an existing value, if not creates one and return it
     * @param filterOption 
     * @template F filterOption type
     * @template C createOption type
     */
    findOneOrCreate<F, C>(filterOption: F, createOption: C): Promise<E>;
}