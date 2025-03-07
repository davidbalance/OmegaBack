import { Aggregate, AggregateProps } from "@shared/shared/domain";
import { CreateLoggerPayload } from "./payloads/create-logger.payloads";

export type LoggerProps = AggregateProps & {
    message: string;
    level: string;
    timestamp: Date;
}

export class Logger extends Aggregate<LoggerProps> {
    public get message(): Readonly<string> {
        return this.props.message;
    }

    public get level(): Readonly<string> {
        return this.props.level;
    }

    public get timestamp(): Readonly<Date> {
        return this.props.timestamp;
    }

    public static create(payload: CreateLoggerPayload): Logger {
        return new Logger({
            ...payload,
            id: crypto.randomUUID()
        });
    }

    public static rehydrate(props: LoggerProps): Logger {
        return new Logger(props);
    }
}