import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { InternalError } from "@shared/shared/domain/error";
import { formatDate } from "date-fns";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export const checklistLayoutLoader = (data: OrderChecklistModel[], image: string): TDocumentDefinitions => {

    const order: OrderChecklistModel = data[0];
    if (!order) throw new InternalError('Failer to retrive order.');

    return {
        pageSize: 'A4',
        pageMargins: [30, 75, 30, 200],
        header: [
            {
                margin: 5,
                alignment: 'center',
                image: image,
                fit: [100, 50],
            },
            {
                table: {
                    widths: ["*", "*", "*", "*"],
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
                                text: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
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
                                text: order.locationJobPosition ? order.locationJobPosition : '',
                                italics: true,
                                alignment: 'center',
                                fontSize: 8
                            },
                            { text: 'TIPO', style: 'tableCell' },
                            {
                                text: order.orderProcess,
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
                ul: data.filter(e => !e.testCheck).map(e => ({
                    columns: [
                        {
                            text: e.examName
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
                        text: '',
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
    }
}