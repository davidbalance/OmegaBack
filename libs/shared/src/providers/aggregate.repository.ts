import { DomainEvent } from "../domain";
import { Aggregate, AggregateProps } from "../domain/aggregate";
import { SearchCriteria } from "../domain/search.builder";

export interface AggregateRepository<TProps extends AggregateProps, TAggregate extends Aggregate<TProps>> {
    findOneAsync(filter: SearchCriteria<TProps>): Promise<TAggregate | null>;
    saveAsync(aggregate: TAggregate): Promise<void>;
}

export interface BatchAggregateRepository<TProps extends AggregateProps, TAggregate extends Aggregate<TProps>> {
    batchAsync(event: DomainEvent<unknown>);
}