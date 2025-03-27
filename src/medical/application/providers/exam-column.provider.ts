export type ExamColum = {
    value: string;
    children: {
        value: string;
        children: string[];
    }[];
}
export interface ExamColumnProvider {
    find(): Promise<ExamColum[]>
}