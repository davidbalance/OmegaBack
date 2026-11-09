import { Entity, EntityProps } from "@shared/shared/domain";

export const RECORD_STATUS_COMPLETED: string = "completed"
export const RECORD_STATUS_STARTED: string = "started"

type BaseRecordProps = EntityProps & {
    clientId: string;
    name: string;
    filepath: string;
    status: string;
    createAt: Date;
};

export type RecordPropsV1 = BaseRecordProps & {
    version: "v1"
}

export type RecordPropsV2 = BaseRecordProps & {
    metadata: any;
    version: "v2"
}

export type RecordProps = RecordPropsV1 | RecordPropsV2

export type RecordVersion = RecordProps["version"]

export class Record extends Entity<RecordProps> {

    public get clientId(): Readonly<string> {
        return this.props.clientId;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public get metadata(): Readonly<any> | null | undefined {
        if (this.props.version == "v2") {
            return this.props.metadata
        }
        return null;
    }

    public get filepath(): Readonly<string> {
        return this.props.filepath
    }

    public get createAt(): Readonly<Date> {
        return this.props.createAt;
    }

    public get status(): Readonly<string> {
        return this.props.status;
    }

    public get version(): Readonly<RecordVersion> {
        return this.props.version;
    }

    public static create(value: Omit<RecordPropsV2, 'id' | "filepath" | "status" | 'createAt' | 'version'>): Record {
        return new Record({
            id: crypto.randomUUID(),
            ...value,
            filepath: "",
            version: "v2",
            status: RECORD_STATUS_STARTED,
            createAt: new Date()
        });
    }

    public updateMetadata(metadata: object): void {
        if (this.props.version != "v2") return;
        this.updateProps({ metadata: metadata })
    }

    public updateFilepath(filepath: string): void {
        if (this.props.status != RECORD_STATUS_COMPLETED)
            this.updateProps({ filepath: filepath });
    }

    public complete(): void {
        this.updateProps({ status: RECORD_STATUS_COMPLETED })
    }

    public uncomplete(): void {
        this.updateProps({ status: RECORD_STATUS_STARTED })
    }

    public static rehydrate(props: RecordProps): Record {
        return new Record(props);
    }
}