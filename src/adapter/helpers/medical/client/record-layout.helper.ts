import { formatDate } from "date-fns";
import { createRecordLayout, HeaderLayoutFunc, SubheaderLayoutFunc } from "./generic-record-helper";
import { ClientRecordLayoutFunc } from "@omega/medical/application/commands/client/client-add-record.command";

const headerLayout: HeaderLayoutFunc = (rowIndex: any) => (rowIndex === 0) ? '#CCCCFF' : null;
const subheaderLayout: SubheaderLayoutFunc = (rowIndex: any) => (rowIndex === 0) ? '#CCFFCC' : null;
export const recordLayoutHelper = (headerBase64: string): ClientRecordLayoutFunc =>
    (e, clinicNumber, fileNumber) => {

        const date = new Date();
        const formatedDate = formatDate(date, 'yyyy/MM/dd');
        const formatedHour = formatDate(date, 'HH:mm');

        return {
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
        }
    }