export type ExamColumn = {
    value: string;
    children: {
        value: string;
        children: string[];
    }[];
}
export interface ExamColumnProvider {
    find(): Promise<ExamColumn[]>
}