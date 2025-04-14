import { Entity, EntityProps } from "@shared/shared/domain";

export type RecordProps = EntityProps & {
    clientId: string;
    filepath: string;
    name: string;
    createAt: Date;
};
export class Record extends Entity<RecordProps> {

    public get clientId(): Readonly<string> {
        return this.props.clientId;
    }

    public get filepath(): Readonly<string> {
        return this.props.filepath;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public get createAt(): Readonly<Date> {
        return this.props.createAt;
    }

    public static create(value: Omit<RecordProps, 'id' | 'createAt'>): Record {
        return new Record({
            id: crypto.randomUUID(),
            ...value,
            createAt: new Date()
        });
    }

    public static rehydrate(props: RecordProps): Record {
        return new Record(props);
    }
}