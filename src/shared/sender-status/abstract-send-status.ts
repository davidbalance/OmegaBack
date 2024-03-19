import { AbstractEntity } from "../sql-database";

export abstract class AbstractSendStatus extends AbstractEntity<number> {
    abstract name: string;
}