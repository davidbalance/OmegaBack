import { ReportContent } from "@omega/medical/application/queries/test/report-get-file.query";
import { formatDate } from "date-fns";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";

export const reportLayoutLoader = (data: ReportContent, header: string, body: Content): TDocumentDefinitions => ({
    pageSize: 'A4',
    pageMargins: [30, 200],
    content: {
        stack: [body]
    },
    header: [
        {
            image: header,
            fit: [595, 100],
            alignment: 'center',
            margin: [0, 0, 0, 10],
        },
        {
            columns: [
                {
                    width: '70%',
                    stack: [
                        {
                            text: [
                                { text: `PACIENTE: `, style: 'fieldTitle' },
                                { text: data.patientFullname, style: 'fieldText' }
                            ],
                            style: 'field'
                        },
                        {
                            text: [
                                { text: `EDAD: `, style: 'fieldTitle' },
                                { text: `${data.patientAge} años`, style: 'fieldText' }
                            ],
                            style: 'field'
                        },
                        {
                            text: [
                                { text: `FECHA: `, style: 'fieldTitle' },
                                { text: formatDate(data.reportEmissionDate, 'yyyy-MM-dd HH:mm:ss'), style: 'fieldText' }
                            ],
                            style: 'field'
                        },
                        {
                            text: [
                                { text: `INSTITUCIÓN: `, style: 'fieldTitle' },
                                { text: data.locationCompanyName, style: 'fieldText' }
                            ],
                            style: 'field'
                        }
                    ],
                },
                {
                    width: '30%',
                    stack: [
                        {
                            text: [
                                { text: `CEDULA: `, style: 'fieldTitle' },
                                { text: data.patientDni, style: 'fieldText' }
                            ],
                            style: 'field'
                        }
                    ],
                },
            ],
        },
        {
            text: `ESTUDIO: ${data.examName}`,
            style: 'fieldTitle',
            margin: [30, 10],
        }
    ],
    footer: {
        columns: [
            {
                width: '50%',
                stack: [
                    { text: `Dr/a.${data.doctorFullname}`, style: 'doctor' },
                    { text: `CI: ${data.doctorDni}`, style: 'fieldTitle' },
                ],
            },
            {
                alignment: 'right',
                image: data.doctorSignature,
                fit: [200, 100],
            },
        ],
        style: 'footer',
    },
    pageBreakBefore: function (currentNode) {
        if (!Array.isArray(currentNode.text)) return false;
        const actualNode = currentNode.text[0] as unknown as { nodeName: string };
        return actualNode.nodeName === 'BR';
    },
    styles: {
        field: {
            margin: [30, 2],
        },
        fieldTitle: {
            fontSize: 12,
            bold: true,
            margin: [0, 2, 0, 2],
        },
        fieldText: {
            fontSize: 12,
            margin: [0, 2, 0, 2],
        },
        doctor: {
            fontSize: 12,
            margin: [0, 15, 0, 5],
        },
        footer: {
            margin: [30, 30],
        },
    }
})