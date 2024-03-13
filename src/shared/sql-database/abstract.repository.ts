import { DeepPartial, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TEntity extends AbstractEntity> {

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
     * @param filterOptions 
     * @param relationOptions 
     * @returns 
     */
    async find(filterOptions: FindOptionsWhere<TEntity>, relationOptions?: FindOptionsRelations<TEntity>): Promise<TEntity[]> {
        return await this.model.find({ where: filterOptions, relations: relationOptions });
    }

    /**
     * Find the first element that math the filter provided
     * @param filterOptions 
     * @param relationOptions 
     * @returns 
     */
    async findOne(filterOptions: FindOptionsWhere<TEntity>, relationOptions?: FindOptionsRelations<TEntity>): Promise<TEntity> {
        const entity = await this.model.findOne({ where: filterOptions, relations: relationOptions });
        if (!entity) {
            this.logger.warn("Entity not found with the given filterOptions", filterOptions);
            throw new NotFoundException(["Entity not found with the given filterOptions"]);
        }
        return entity;
    }

    /**
     * Find one item and updates it using hte provided values
     * @param filterOptions 
     * @param updateOptions 
     * @returns 
     */
    async findOneAndUpdate(filterOptions: FindOptionsWhere<TEntity>, updateOptions: Partial<TEntity>): Promise<TEntity> {
        const entity = await this.model.findOneBy(filterOptions);
        if (!entity) {
            this.logger.warn("Entity not found with the given filterOptions", filterOptions);
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
    async findOneAndDelete(filterOptions: FindOptionsWhere<TEntity>): Promise<void> {
        const entity = await this.model.findOneBy(filterOptions);
        if (!entity) {
            this.logger.warn("Entity not found with the given filterOptions", filterOptions);
            throw new NotFoundException(["Entity not found with the given filterOptions"]);
        }
        await this.model.delete(filterOptions);
    }
}