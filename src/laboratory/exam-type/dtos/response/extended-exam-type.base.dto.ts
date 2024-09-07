import { ExtendedExamSubtype } from "@/laboratory/exam-subtype/dtos/response/extended-exam-subtype.base.dto";
import { Expose, Type } from "class-transformer";

export class ExtendedExamType {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;

    @Type(() => ExtendedExamSubtype)
    @Expose() public readonly subtypes: ExtendedExamSubtype[];
}