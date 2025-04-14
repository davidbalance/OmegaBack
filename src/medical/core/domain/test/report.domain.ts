import { EntityProps, Entity } from "@shared/shared/domain";
import { CreateReportPayload } from "./payloads/report.payloads";

type ReportProps = EntityProps & {
    testId: string;
    content: string | null | undefined;
    filepath: string | null | undefined;
};
export class Report extends Entity<ReportProps> {

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get content(): Readonly<string> | null | undefined {
        return this.props.content;
    }

    public get filepath(): Readonly<string> | null | undefined {
        return this.props.filepath;
    }

    public static create(value: CreateReportPayload): Report {
        return new Report({
            ...value,
            id: crypto.randomUUID(),
            content: null,
            filepath: null
        });
    }

    public static rehydrate(props: ReportProps): Report {
        return new Report(props);
    }

    public addContent(content: string): void {
        this.updateProps({ content: content, filepath: null });
    }

    public addFile(filepath: string): void {
        this.updateProps({ filepath: filepath });
    }

    public removeContent(): void {
        this.updateProps({ content: null, filepath: null });
    }
}