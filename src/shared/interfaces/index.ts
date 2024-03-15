/**
 * Signature to update entity status
 * @template K Primary key
 * @template M Entity
 */
export interface RepositoryUpdateStatusExtension<K, M> {
    findOneAndUpdateStatus(id: K, status: boolean): Promise<M>
}
