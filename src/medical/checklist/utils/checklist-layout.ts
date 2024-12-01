import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Checklist } from "../dto/response/checklist.base.dto";
import dayjs from "dayjs";

export const checklistLayout = (data: Checklist, image: string): TDocumentDefinitions => ({
    pageSize: 'A4',
    pageMargins: [30, 75, 30, 200],
    header: [{
        margin: 5,
        alignment: 'center',
        image: image,
        fit: [100, 50],
    },
    {
        table: {
            widths: ['*', '*', '*', '*',],
            body: [
                [
                    { text: 'CHECKLIST DE EXAMENES', style: 'header', colSpan: 2, rowSpan: 2 },
                    { text: '', rowSpan: 2 },
                    {
                        text: 'FECHA DE EMISION',
                        bold: true,
                        fontSize: 12,
                        rowSpan: 2
                    },
                    {
                        text: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        fontSize: 10,
                        rowSpan: 2
                    }
                ],
                [
                    { text: '' },
                    { text: '' },
                    { text: '' },
                    { text: '' },
                ]
            ]
        },
        layout: 'noBorders',
        marginBottom: 20,
    }],
    content: [
        {
            table: {
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        { text: 'FECHA DE INGRESO', style: 'tableCell' },
                        { text: '' },
                        { text: 'HORA DE INGRESO', style: 'tableCell' },
                        { text: '' },
                    ],
                    [
                        { text: 'FECHA DE ATENCION', style: 'tableCell' },
                        { text: '' },
                        { text: 'HORA DE SALIDA', style: 'tableCell' },
                        { text: '' },
                    ],
                    [
                        { text: 'CARGO', style: 'tableCell' },
                        {
                            text: data.jobPosition,
                            italics: true,
                            alignment: 'center',
                            fontSize: 8
                        },
                        { text: 'TIPO', style: 'tableCell' },
                        {
                            text: data.process,
                            italics: true,
                            alignment: 'center',
                            fontSize: 8
                        },
                    ]
                ]
            },
            margin: [0, 10]
        },
        {
            text: 'Checklist de Examenes',
            style: 'sectionTitle',
            margin: [0, 20]
        },
        {
            type: 'circle',
            ul: data.exams.map(e => ({
                columns: [
                    {
                        text: `${e.examName}.`
                    },
                    {
                        text: 'Resp: ________________________'
                    }
                ]
            }))
        },
    ],
    footer: [
        {
            stack: [
                {
                    text: '______________________',
                    alignment: 'center',
                    style: 'signature'
                },
                {
                    text: 'FIRMA DEL PACIENTE',
                    alignment: 'center',
                    style: 'signature'
                },
            ],
        }
        /* {
            layout: 'noBorders',
            table: {
                widths: ['*', '*', '*', '*'],
                body: [
                    ['', '', {
                        text: 'Firma del paciente',
                        alignment: 'center',
                        marginTop: 16,
                    }, '']
                ]
            }
        } */
    ],
    styles: {
        header: {
            fontSize: 16,
            bold: true,
            alignment: 'center'
        },
        tableCell: {
            fontSize: 12,
            alignment: 'center'
        },
        sectionTitle: {
            fontSize: 16,
            bold: true,
            margin: [0, 10]
        },
        checklistText: {
            fontSize: 12,
            margin: [0, 10]
        },
        signature: {
            fontSize: 12,
            italics: true
        }
    }
});