
import { EntityProps, Entity } from "@shared/shared/domain";
import { CreateResultPayload } from "./payloads/result.payloads";

type ResultProps = EntityProps & {
    testId: string;
    filepath: string;
    hasFile: boolean;
};
export class Result extends Entity<ResultProps> {

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get filepath(): Readonly<string> {
        return this.props.filepath;
    }


    public get hasFile(): Readonly<boolean> {
        return this.props.hasFile;
    }

    public static create(value: CreateResultPayload): Result {
        return new Result({
            ...value,
            id: crypto.randomUUID(),
            filepath: "",
            hasFile: false
        });
    }

    public static rehydrate(props: ResultProps): Result {
        return new Result(props);
    }

    public addFile(filepath: string): void {
        this.updateProps({ filepath, hasFile: true });
    }

    public removeFile(): void {
        this.updateProps({ filepath: "", hasFile: false });
    }
}