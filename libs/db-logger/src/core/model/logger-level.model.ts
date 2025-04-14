import { Model, ModelProps } from "@shared/shared/domain/model";

export type LoggerLevelModelProps = ModelProps & {
    level: string;
}

export class LoggerLevelModel extends Model<LoggerLevelModelProps> {
    public get level(): Readonly<string> {
        return this.props.level;
    }
}