import { Module } from "@nestjs/common";
import { LaboratoryModule } from "@omega/laboratory/laboratory.module";
import { ExamColumnProxyProvider } from "./exam-column.service";
import { ExamColumnToken } from "@omega/medical/nest/inject/provider.inject";

@Module({
    imports: [
        LaboratoryModule
    ],
    providers: [ExamColumnProxyProvider],
    exports: [
        ExamColumnToken
    ]
})
export class LaboratoryProxyModule { }