import { IsBoolean } from "class-validator";

export class PatchChecklistItemStaus {
    @IsBoolean()
    public readonly status: boolean;
}