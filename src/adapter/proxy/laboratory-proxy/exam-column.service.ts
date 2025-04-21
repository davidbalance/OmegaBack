import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeFindOptionsQuery } from "@omega/laboratory/application/query/exam/exam-type-find-options.query";
import { InjectQuery } from "@omega/laboratory/nest/inject/query.inject";
import { ExamColumn, ExamColumnProvider } from "@omega/medical/application/providers/exam-column.provider";
import { ExamColumnToken } from "@omega/medical/nest/inject/provider.inject";

@Injectable()
export class ExamColumnService implements ExamColumnProvider {

    constructor(
        @InjectQuery('ExamTypeFindOptions') private readonly options: ExamTypeFindOptionsQuery
    ) { }

    async find(): Promise<ExamColumn[]> {
        const values = await this.options.handleAsync();

        return values.map(e => ({
            value: e.label,
            children: e.children.map(x => ({
                value: x.label,
                children: x.children.map(y => y.label)
            }))
        }));
    }
}

export const ExamColumnProxyProvider: Provider = {
    provide: ExamColumnToken,
    useClass: ExamColumnService
}