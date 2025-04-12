import { Content, TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportContent {
    title: string,
    patientFullname: string,
    patientAge: number,
    patientDni: string,
    date: string,
    company: string,
    examName: string,
    doctorFullname: string,
    doctorDni: string,
    doctorSignature: string
}

export const medicalReportDocumentLayout = (data: ReportContent, body: Content): TDocumentDefinitions => ({
    pageSize: 'A4',
    pageMargins: [30, 30, 30, 30],
    content: [
        {
            table: {
                widths: ['*'],
                body: [
                    [
                        {
                            text: 'omega',
                            style: 'header',
                            fillColor: 'orange',
                            color: 'white',
                            alignment: 'center',
                            margin: [0, 0, 0, 10],
                        },
                    ],
                ],
            },
            layout: 'noBorders',
        },
        {
            style: 'wrapper',
            stack: [
                {
                    columns: [
                        {
                            width: '70%',
                            stack: [
                                {
                                    text: [
                                        { text: `PACIENTE: `, style: 'field' },
                                        { text: data.patientFullname, style: 'fieldText' }]
                                },
                                {
                                    text: [
                                        { text: `EDAD: `, style: 'field' },
                                        { text: `${data.patientAge} años`, style: 'fieldText' }]
                                },
                                {
                                    text: [
                                        { text: `FECHA: `, style: 'field' },
                                        { text: data.date, style: 'fieldText' }]
                                },
                                {
                                    text: [
                                        { text: `INSTITUCIÓN: `, style: 'field' },
                                        { text: data.company, style: 'fieldText' }]
                                }
                            ],
                        },
                        {
                            width: '30%',
                            stack: [
                                {
                                    text: [
                                        { text: `CEDULA: `, style: 'field' },
                                        { text: data.patientDni, style: 'fieldText' }]
                                }
                            ],
                        },
                    ],
                },
                { text: `ESTUDIO: ${data.examName}`, style: 'field' },
                body
            ],
        },
    ],
    footer: (currentPage, pageCount): Content => {
        if (currentPage === pageCount) {
            return {
                columns: [
                    {
                        width: '50%',
                        stack: [
                            { text: `Dr/a. ${data.doctorFullname}`, style: 'doctor' },
                            { text: `CI: ${data.doctorDni}`, style: 'field' },
                        ],
                    },
                    {
                        alignment: 'right',
                        image: data.doctorSignature,
                        fit: [200, 100],
                    },
                ],
                style: 'footer',
            };
        }
        return undefined;
    },
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
        },
        headerTitle: {
            margin: [0, 25, 0, 0],
        },
        wrapper: {
            margin: [0, 0, 0, 100],
        },
        field: {
            fontSize: 12,
            bold: true,
            margin: [0, 2, 0, 2],
        },
        fieldText: {
            fontSize: 12,
            margin: [0, 2, 0, 2],
        },
        content: {
            fontSize: 12,
            margin: [0, 24, 0, 10],
        },
        doctor: {
            fontSize: 12,
            margin: [0, 15, 0, 5],
        },
        footer: {
            margin: [30, -150, 30, 30],
        },
    },
});