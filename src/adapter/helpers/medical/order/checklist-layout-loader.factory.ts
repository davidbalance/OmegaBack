import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { InternalError } from "@shared/shared/domain/error";
import { formatDate } from "date-fns";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export const checklistLayoutLoader = (data: OrderChecklistModel[], image: string): TDocumentDefinitions => {

    const order: OrderChecklistModel = data[0];
    if (!order) throw new InternalError('Failer to retrive order.');

    return {
        pageSize: 'A4',
        pageMargins: [30, 75, 30, 125],
        header: [
            {
                margin: 5,
                alignment: 'center',
                image: image,
                fit: [100, 50],
            },
            {
                table: {
                    widths: ["*"],
                    body: [
                        [
                            {
                                text: 'CHECKLIST DE EXAMENES',
                                style: 'header'
                            },
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
                            {
                                text: 'FECHA DE INGRESO',
                                style: 'itemTitle',
                                marginTop: 3,
                                marginBottom: 3
                            },
                            {
                                text: formatDate(new Date, 'yyyy/MM/dd'),
                                style: 'itemText',
                                marginTop: 3,
                                marginBottom: 3
                            },
                            {
                                text: 'HORA DE INGRESO PACIENTE',
                                style: 'itemTitle',
                                marginTop: 3,
                                marginBottom: 3
                            },
                            { text: '' },
                        ],
                        [
                            {
                                text: 'FECHA DE ATENCION',
                                style: 'itemTitle',
                                marginTop: 3,
                                marginBottom: 3
                            },
                            { text: '' },
                            {
                                text: 'HORA DE SALIDA PACIENTE',
                                style: 'itemTitle',
                                marginTop: 3,
                                marginBottom: 3
                            },
                            { text: '' },
                        ]
                    ]
                },
                margin: [0, 5]
            },
            {
                table: {
                    widths: ['*', '*', 'auto', '*', '*', 'auto', '*', '*'],
                    body: [
                        [
                            {
                                stack: [
                                    {
                                        text: 'PUESTO',
                                        style: 'itemTitle',
                                    },
                                    {
                                        text: order.locationJobPosition ? order.locationJobPosition : '',
                                        italics: true,
                                        style: 'itemText',
                                    }
                                ],
                                colSpan: 2,
                                rowSpan: 3
                            },
                            { text: '' },
                            { text: '', border: [false, false, false, false], rowSpan: 6 },
                            {
                                stack: [
                                    {
                                        text: 'PACIENTE',
                                        style: 'itemTitle',
                                    },
                                    {
                                        text: `${order.patientName} ${order.patientLastname}`,
                                        style: 'itemText',
                                    }
                                ],
                                colSpan: 2,
                                rowSpan: 2
                            },
                            { text: '' },
                            { text: '', border: [false, false, false, false], rowSpan: 6 },
                            {
                                stack: [
                                    {
                                        text: 'EMPRESA',
                                        style: 'itemTitle'
                                    },
                                    {
                                        text: order.locationCompanyName,
                                        style: 'itemText',
                                    }
                                ],
                                colSpan: 2,
                                rowSpan: 3
                            },
                            { text: '' },
                        ],
                        ['', '', '', '', '', '', '', ''],
                        ['', '', '',
                            {
                                stack: [
                                    {
                                        text: 'CEDULA',
                                        style: 'itemTitle',
                                    },
                                    {
                                        text: order.patientDni,
                                        style: 'itemText',
                                    }
                                ],
                                colSpan: 2,
                                rowSpan: 2
                            },
                            '', '', ''],
                        [
                            {
                                stack: [
                                    {
                                        text: 'TIPO',
                                        style: 'itemTitle',
                                    },
                                    {
                                        text: order.orderProcess,
                                        italics: true,
                                        style: 'itemText',
                                    }
                                ],
                                colSpan: 2,
                                rowSpan: 3
                            },
                            { text: '' },
                            { text: '' },
                            { text: '' },
                            { text: '' },
                            { text: '' },
                            {
                                stack: [
                                    {
                                        text: 'RUC',
                                        style: 'itemTitle'
                                    },
                                    {
                                        text: order.locationCompanyRuc,
                                        style: 'itemText',
                                    }
                                ],
                                colSpan: 2,
                                rowSpan: 3
                            },
                            { text: '' },
                        ],
                        ['', '', '',
                            {
                                text: 'EDAD',
                                style: 'itemTitle',
                                rowSpan: 2
                            },
                            {
                                text: '',
                                rowSpan: 2
                            },
                            '', '', ''],
                        ['', '', '', '', '', '', '', ''],
                    ]
                },
                margin: [0, 5]
            },
            {
                table: {
                    widths: ['auto', '*', 'auto', 'auto'],
                    body: data.filter(e => !e.testCheck).map(e => [
                        [
                            {
                                table: {
                                    widths: ['auto'],
                                    body: [[{ text: '', margin: [1, 3, 1, 3] }]]
                                },
                                border: [false],
                            },
                            {
                                text: e.examName,
                                style: 'itemText',
                                alignment: 'left',
                                border: [false]
                            },
                            {
                                text: 'Resp:________________________',
                                style: 'itemText',
                                alignment: 'left',
                                border: [false]
                            },
                            {
                                text: 'Observación:_____________________________________________',
                                style: 'itemText',
                                alignment: 'left',
                                border: [false, false, false, false],
                            }
                        ],
                        [
                            { text: '', marginTop: 2, marginBottom: 2, border: [false] },
                            { text: '', border: [false] },
                            { text: '', border: [false] },
                            { text: '', border: [false] },
                        ]
                    ]).reduce((prev, curr) => [...prev, ...curr], [])
                },
                marginTop: 30
            }
        ],
        footer: [
            {
                table: {
                    widths: ['*', '*', '*', '*', '*'],
                    body: [
                        [
                            {
                                text: '',
                                border: [false]
                            },
                            {
                                text: '',
                                border: [false]
                            },
                            {
                                text: '',
                                border: [false]
                            },
                            {
                                text: '',
                                border: [false]
                            },
                            {
                                text: '',
                                border: [false]
                            }
                        ],
                        [
                            {
                                text: '',
                                border: [false]
                            },
                            {
                                text: '',
                                border: [false]
                            },
                            {
                                text: 'FIRMA DEL PACIENTE',
                                alignment: 'center',
                                style: 'itemText',
                                border: [false, true, false, false,]
                            },
                            {
                                text: '',
                                border: [false]
                            }, {
                                text: '',
                                border: [false]
                            },
                        ]
                    ]
                }
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
            itemTitle: {
                fontSize: 8,
                bold: true,
                alignment: 'center'
            },
            itemText: {
                fontSize: 8,
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