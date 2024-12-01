import { Expose, Type } from "class-transformer";

class ChecklistExam {
    @Expose() public readonly id: number;
    @Expose() public readonly examName: string;
    @Expose() public readonly checklistStatus: boolean;
}

export class Checklist {
    @Expose() public readonly clientDni: string;
    @Expose() public readonly clientName: string;
    @Expose() public readonly clientLastname: string;
    @Expose() public readonly jobPosition: string;
    @Expose() public readonly process: string;
    @Expose() public readonly companyRuc: string;
    @Expose() public readonly companyName: string;
    @Expose() public readonly createAt: Date;

    @Type(() => ChecklistExam)
    @Expose() public readonly exams: ChecklistExam[];
}