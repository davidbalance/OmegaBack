import { Model } from "@shared/shared/domain/model";

export type JobPositionModelProps = {
    jobPositionId: string;
    jobPositionName: string;
}
export class JobPositionModel extends Model<JobPositionModelProps> {
    public get jobPositionId(): Readonly<string> {
        return this.props.jobPositionId;
    }
    
    public get jobPositionName(): Readonly<string> {
        return this.props.jobPositionName;
    }
}