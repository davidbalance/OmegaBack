import { formatDate } from "date-fns";
import { createRecordLayout } from "./generic-record-helper";
import { ClientRecordLayoutFunc, GenericRecord } from "@omega/medical/application/commands/client/client-add-record.command";
import { craftCell, craftRow, craftSpacing, craftTable } from "./table.helper";

const recordTitle = (value: Pick<GenericRecord, 'type'>): string => {
    switch (value.type) {
        case "inicial": return "FORMULARIO DE EVALUACION PREOCUPACIONAL - INICIO";
        case "periodico": return "FORMULARIO DE EVALUACION PERIODICA";
        case "reintegrar": return "FORMULARIO DE EVALUACION REINTEGRO";
        case "retiro": return "FORMULARIO DE EVALUACION RETIRO";
        case "certificado": return "CERTIFICADO DE SALUD EN EL TRABAJO";
    }
}

const recordMessage = (value: Pick<GenericRecord, 'type'>): string => {
    switch (value.type) {
        case "inicial": return "CERTIFICO QUE LO ANTERIORMENTE EXPRESADO EN RELACIÓN A MI ESTADO DE SALUD ES VERDAD. SE ME HA INFORMADO LAS MEDIDAS PREVENTIVAS A TOMAR PARA DISMINUIR O MITIGAR LOS RIESGOS RELACIONADOS CON MI ACTIVIDAD LABORAL.";
        case "periodico": return "CERTIFICO QUE LO ANTERIORMENTE EXPRESADO EN RELACIÓN A MI ESTADO DE SALUD ES VERDAD. SE ME HA INFORMADO LAS MEDIDAS PREVENTIVAS A TOMAR PARA DISMINUIR O MITIGAR LOS RIESGOS RELACIONADOS CON MI ACTIVIDAD LABORAL.";
        case "reintegrar": return "CERTIFICO QUE LO ANTERIORMENTE EXPRESADO EN RELACIÓN A MI ESTADO DE SALUD ES VERDAD. SE ME HA INFORMADO LAS MEDIDAS PREVENTIVAS A TOMAR PARA DISMINUIR O MITIGAR LOS RIESGOS RELACIONADOS CON MI ACTIVIDAD LABORAL.";
        case "retiro": return "CERTIFICO QUE LO ANTERIORMENTE EXPRESADO EN RELACIÓN A MI ESTADO DE SALUD ES VERDAD. SE ME HA INFORMADO MI ESTADO ACTUAL DE SALUD Y LAS RECOMENDACIONES PERTINENTES.";
        case "certificado": return "La presente certificación se expide con base en la historia ocupacional del usuario (a), la cual tiene carácter de confidencial.";
    }
}

const footer = (value: Pick<GenericRecord, 'authorDni' | 'authorFullname' | 'type'>) => {
    const date = new Date();
    const formatedDate = formatDate(date, 'yyyy/MM/dd');
    const formatedHour = formatDate(date, 'HH:mm');

    if (value.type === 'certificado') {
        return craftRow(
            craftCell("NOMBRES Y APELLIDOS", {
                colSpan: 4,
                style: 'itemTitle'
            }),
            craftCell(`${value.authorFullname}`.replaceAll('  ', ' ').trim(), { colSpan: 12 }),
            craftCell("CÓDIGO", {
                colSpan: 6,
                style: 'itemTitle'
            }),
            craftCell(value.authorDni, { colSpan: 10 }),
            craftCell("FIRMA Y SELLO", {
                colSpan: 3,
                style: 'itemTitle'
            }),
            craftCell('', { colSpan: 15 }),
            craftCell('', {
                colSpan: 18,
            }),
        )
    }

    return craftRow(
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
        craftCell(`${value.authorFullname}`.replaceAll('  ', ' ').trim(), { colSpan: 9 }),
        craftCell("CÓDIGO", {
            colSpan: 3,
            style: 'itemTitle'
        }),
        craftCell(value.authorDni, { colSpan: 5 }),
        craftCell("FIRMA Y SELLO", {
            colSpan: 3,
            style: 'itemTitle'
        }),
        craftCell('', { colSpan: 15 }),
        craftCell('', {
            colSpan: 18,
        }),
    )
}

export const recordLayoutHelper = (headerBase64: string): ClientRecordLayoutFunc =>
    (e, fileNumber) => {

        const tableSize: number = 70;

        const table = craftTable(tableSize, 6,
            craftRow(
                craftCell(recordTitle(e), {
                    border: [],
                    colSpan: tableSize,
                    style: 'recordTitle',
                })
            ),
            craftRow(craftSpacing({ colSpan: tableSize })),
            ...createRecordLayout(e, { fileNumber }),
            ...[craftRow(craftSpacing({ colSpan: tableSize })),
            e.type === 'certificado' ? craftRow(
                craftCell("Con este documento certifico que el trabajador se ha sometido a la evaluación médica requerida para (el ingreso /la ejecución/ el reintegro y retiro) al puesto laboral y se ha informado sobre los riesgos relacionados con el trabajo emitiendo recomendaciones relacionadas con su estado de salud.", {
                    colSpan: tableSize,
                    style: 'itemTitle',
                })
            ) : undefined].filter(e => !!e),
            craftRow(
                craftCell(recordMessage(e), {
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
                craftCell("FIRMA USUARIO", {
                    colSpan: 18,
                    style: 'tableHeader'
                }),
            ),
            footer(e)

        )
        return {
            pageSize: 'A4',
            pageMargins: [13, 50, 13, 30],
            content: [table],
            header: e.hideLogo ? [] : [
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
        }
    }