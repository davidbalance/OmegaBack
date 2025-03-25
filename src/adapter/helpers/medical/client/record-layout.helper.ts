import { formatDate } from "date-fns";
import { createRecordLayout } from "./generic-record-helper";
import { ClientRecordLayoutFunc } from "@omega/medical/application/commands/client/client-add-record.command";
import { craftCell, craftRow, craftSpacing, craftTable } from "./table.helper";

export const recordLayoutHelper = (headerBase64: string): ClientRecordLayoutFunc =>
    (e, clinicNumber, fileNumber) => {

        const date = new Date();
        const formatedDate = formatDate(date, 'yyyy/MM/dd');
        const formatedHour = formatDate(date, 'HH:mm');

        const tableSize: number = 70;

        const table = craftTable(tableSize, 6,
            craftRow(
                craftCell(`Ficha: ${e.type.toUpperCase()}`, {
                    border: [],
                    colSpan: tableSize,
                    style: 'recordTitle',
                })
            ),
            craftRow(craftSpacing({ colSpan: tableSize })),
            ...createRecordLayout(e, { clinicNumber, fileNumber }),
            craftRow(craftSpacing({ colSpan: tableSize })),
            craftRow(
                craftCell("CERTIFICO QUE LO ANTERIORMENTE EXPRESADO EN RELACIÓN A MI ESTADO DE SALUD ES VERDAD. SE ME HA INFORMADO LAS MEDIDAS PREVENTIVAS A TOMAR PARA DISMINUIR O MITIGAR LOS RIESGOS RELACIONADOS CON MI ACTIVIDAD LABORAL.", {
                    colSpan: tableSize,
                    style: 'certificateMessage',
                    border: []
                })),
            craftRow(craftSpacing({ colSpan: tableSize })),
            craftRow(
                craftCell("DATOS DEL PROFESIONAL", {
                    colSpan: 50,
                    style: 'tableHeader',
                }),
                craftSpacing({ colSpan: 2, rowSpan: 2 }),
                craftCell("DATOS DEL PROFESIONAL", {
                    colSpan: 18,
                    style: 'tableHeader'
                }),
            ),
            craftRow(
                craftCell("FECHA", {
                    colSpan: 3,
                    style: 'itemTitle'
                }),
                craftCell(formatedDate, { colSpan: 4 }),
                craftCell("HORA", {
                    colSpan: 2,
                    style: 'itemTitle'
                }),
                craftCell(formatedHour, { colSpan: 2 }),
                craftCell("NOMBRES Y APELLIDOS", {
                    colSpan: 4,
                    style: 'itemTitle'
                }),
                craftCell(`${e.patientFirstName} ${e.patientMiddleName} ${e.patientLastName} ${e.patientSecondLastName}`.replaceAll('  ', ' ').trim(), { colSpan: 9 }),
                craftCell("CÓDIGO", {
                    colSpan: 3,
                    style: 'itemTitle'
                }),
                craftCell('', { colSpan: 5 }),
                craftCell("FIRMA Y SELLO", {
                    colSpan: 3,
                    style: 'itemTitle'
                }),
                craftCell('', { colSpan: 15 }),
                craftCell('', {
                    colSpan: 18,
                }),
            )
        )
        return {
            pageSize: 'A4',
            pageMargins: [13, 50, 13, 30],
            content: [table],
            header: [
                {
                    margin: 5,
                    alignment: 'center',
                    image: headerBase64,
                    fit: [100, 50],
                },
            ],
            styles: {
                recordTitle: {
                    bold: true,
                    fontSize: 8,
                    color: 'black',
                },
                tableHeader: {
                    bold: true,
                    fontSize: 7,
                    color: 'black',
                    fillColor: '#CCCCFF'
                },
                itemTitle: {
                    color: 'black',
                    fillColor: '#CCFFCC'
                },
                itemSubtitle: {
                    color: 'black',
                    fillColor: '#CCFFFF'
                },
                label: {
                    bold: true,
                    color: 'black',
                },
                certificateMessage: {
                    fontSize: 6,
                    italics: true
                }
            },
            defaultStyle: {
                fontSize: 5,
                wrap: true
            }
        }/* return {
            pageSize: 'A4',
            pageMargins: [30, 50, 30, 30],
            content: [
                ...createRecordLayout(e, { clinicNumber, fileNumber, headerLayout, subheaderLayout }),
                {
                    marginBottom: 5,
                    text: "CERTIFICO QUE LO ANTERIORMENTE EXPRESADO EN RELACIÓN A MI ESTADO DE SALUD ES VERDAD. SE ME HA INFORMADO LAS MEDIDAS PREVENTIVAS A TOMAR PARA DISMINUIR O MITIGAR LOS RIESGOS RELACIONADOS CON MI ACTIVIDAD LABORAL.",
                    style: {
                        fontSize: 9,
                        italics: true
                    }
                },
                {
                    width: '*',
                    table: {
                        widths: ["auto", "*", "auto", "*", "*", "*", "auto", "*", "auto", "15%"],
                        body: [
                            [{ text: 'DATOS DEL PROFESIONAL', style: 'tableHeader', colSpan: 10 }, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                            ['FECHA', formatedDate, 'HORA', formatedHour, 'NOMBRES Y APELLIDOS', '', 'CODIGO', '', 'FIRMA Y SELLO', ''],
                        ]
                    },
                    layout: {
                        fillColor: headerLayout
                    }

                },
                {
                    marginTop: 60,
                    width: '*',
                    table: {
                        widths: ["*", "*", "*"],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: ''
                                },
                                {
                                    marginTop: 5,
                                    border: [false, true, false, false],
                                    text: 'FIRMA DEL USUARIO',
                                    style: 'tableHeader',
                                    alignment: 'center'
                                },
                                {
                                    border: [false, false, false, false],
                                    text: ''
                                },
                            ]
                        ]
                    },
                }
            ],
            header: [
                {
                    margin: 5,
                    alignment: 'center',
                    image: headerBase64,
                    fit: [100, 50],
                },
            ],
            styles: {
                itemElement: {
                    marginTop: 2,
                },
                tableHeader: {
                    bold: true,
                    fontSize: 10,
                    color: 'black'
                },
                itemHeader: {
                    color: 'black',
                    fontSize: 9,
                },
                descriptionItem: {
                    bold: true,
                    color: 'black',
                    fontSize: 9,
                },
                verticalText: {
                    textRenderer: (text: string) => {
                        return {
                            text: text,
                            absolutePosition: { x: 0, y: 0 },
                            rotation: Math.PI / 2 // 90 degrees in radians
                        };
                    }
                }
            },
            defaultStyle: {
                fontSize: 8
            }
        } */
    }