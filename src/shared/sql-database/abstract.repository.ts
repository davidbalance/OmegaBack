import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsOrder, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Logger, NotFoundException } from "@nestjs/common";

/**
 * Abstract repository with the basics methods for a repository
 * @template K Primary key type
 * @template TEntity Entity type
 */
export abstract class AbstractRepository<K, TEntity extends AbstractEntity<K>> {

    protected abstract logger: Logger;

    constructor(
        private readonly model: Repository<TEntity>
    ) { }

    /**
     * Creates a new entity and saves it in the database
     * @param entity 
     * @returns 
     */
    async create(entity: DeepPartial<TEntity>): Promise<TEntity> {
        const newEntity = await this.model.save(entity);
        return newEntity;
    }

    /**
     * Find all the items that mathes the filter provided
     * @param options 
     * @returns 
     */
    async find(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
        return await this.model.find(options);
    }

    /**
     * Find the first element that math the filter provided if there is not matches throws exception
     * @param filterOptions 
     * @param relationOptions 
     * @throws NotFoundException
     * @returns
     */
    async findOne(options: FindOneOptions<TEntity>): Promise<TEntity> {
        const entity = await this.model.findOne(options);
        if (!entity) {
            this.logger.warn("Entity not found with the given filterOptions", JSON.stringify(options));
            throw new NotFoundException(["Entity not found with the given filterOptions"]);
        }
        return entity;
    }

    /**
     * Find one item and updates it using hte provided values
     * @param filterOptions 
     * @param updateOptions 
     * @throws NotFoundException
     * @returns 
     */
    async findOneAndUpdate(filterOptions: FindOptionsWhere<TEntity>, updateOptions: Partial<TEntity>): Promise<TEntity> {
        const entity = await this.findOne({ where: filterOptions });
        if (!entity) {
            this.logger.warn("Entity not found with the given filterOptions", JSON.stringify(filterOptions));
            throw new NotFoundException(["Entity not found with the given filterOptions"]);
        }
        const updateEntity = { ...entity, ...updateOptions };
        await this.model.save(updateEntity);
        return updateEntity;
    }

    /**
     * 
     * @param filterOptions Find one item and remove it from the database
     */
    abstract findOneAndDelete(filterOptions: FindOptionsWhere<TEntity>): void | Promise<void>;
}