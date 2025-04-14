import { Model, ModelProps } from "@shared/shared/domain/model";

export type LoggerModelProps = ModelProps & {
    message: string;
    level: string;
    timestamp: Date;
}

export class LoggerModel extends Model<LoggerModelProps> {
    public get message(): Readonly<string> {
        return this.props.message;
    }

    public get level(): Readonly<string> {
        return this.props.level;
    }

    public get timestamp(): Readonly<Date> {
        return this.props.timestamp;
    }

}