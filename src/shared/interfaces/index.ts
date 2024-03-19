/**
 * Signature to update entity status
 * @template K Primary key
 * @template M Entity
 */
export interface RepositoryUpdateStatusExtension<K, M> {
    findOneAndUpdateStatus(id: K, status: boolean): Promise<M>
}

/**
 * Signature to check the availability of a entity
 * @template K Primary key type
 */
export interface IServiceCheckAvailability<K> {
    checkAvailability(key: K): Promise<boolean>
}

/**
 * Find one create base
 */
export interface FindOneOrCreate<K> {
    lookup: K
}