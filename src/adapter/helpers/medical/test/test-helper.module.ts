import { BadRequestException, Module } from "@nestjs/common";
import { ReportLayoutToken } from "@omega/medical/nest/inject/function.inject";
import { JSDOM } from 'jsdom';
import { reportLayoutLoader } from "./report-layout-loader.factory";
import { ReportContent, ReportLayoutFunc } from "@omega/medical/application/queries/test/report-get-file.query";
import { Content } from "pdfmake/interfaces";
import { FileToken, FileType, FSModule, PathModule, PathToken, PathType } from "@shared/shared/common";
import htmlToPdfmake from 'html-to-pdfmake';

@Module({
    imports: [FSModule, PathModule],
    providers: [
        {
            provide: ReportLayoutToken,
            useFactory: (argPath: PathType, argFile: FileType): ReportLayoutFunc => {
                const bufferHeaderPath = argPath.resolve('static/templates/medical_report/header.png');
                const bufferHeader = argFile.readFileSync(bufferHeaderPath);
                const base64Header = bufferHeader.toString('base64');

                const dom: JSDOM = new JSDOM();

                return (value: ReportContent) => {
                    if (value.reportContent) {
                        const body: Content = htmlToPdfmake(value.reportContent, { window: dom.window });
                        return reportLayoutLoader(value, `data:image/png;base64,${base64Header}`, body);
                    } else {
                        throw new BadRequestException('There is not content for this report.');
                    }
                }
            },
            inject: [PathToken, FileToken]
        }
    ],
    exports: [
        ReportLayoutToken,
    ]
})
export class TestHelperModule { }