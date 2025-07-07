import { formatDate } from "date-fns";
import { createRecordLayout } from "./generic-record-helper";
import { ClientRecordLayoutFunc, GenericRecord } from "@omega/medical/application/commands/client/client-add-record.command";
import { craftCell, craftRow, craftSpacing, craftTable } from "./table.helper";
import { TZDate } from "@date-fns/tz";

const recordTitle = (value: Pick<GenericRecord, 'type'>): string => {
    switch (value.type) {
        case "inicial": return "Formulario de Evaluación Preocupacional - Inicio";
        case "periodico": return "Formulario de Evaluación Periódica";
        case "reintegrar": return "Formulario de Evaluación Reintegro";
        case "retiro": return "Formulario de Evaluación Retiro";
        case "certificado": return "Certificado de Salud en el Trabajo";
    }
}

const recordMessage = (value: Pick<GenericRecord, 'type'>): string => {
    switch (value.type) {
        case "inicial": return "Certifico que lo anteriormente expresado en relación a mi estado de salud es verdad. Se me ha informado sobre las medidas preventivas a tomar para disminuir o mitigar los riesgos relacionados con mi actividad laboral.";
        case "periodico": return "Certifico que lo anteriormente expresado en relación a mi estado de salud es verdad. Se me ha informado sobre las medidas preventivas a tomar para disminuir o mitigar los riesgos relacionados con mi actividad laboral.";
        case "reintegrar": return "Certifico que lo anteriormente expresado en relación a mi estado de salud es verdad. Se me ha informado sobre las medidas preventivas a tomar para disminuir o mitigar los riesgos relacionados con mi actividad laboral.";
        case "retiro": return "Certifico que lo anteriormente expresado en relación a mi estado de salud es verdad. Se me ha informado mi estado actual de salud y las recomendaciones pertinentes.";
        case "certificado": return "La presente certificación se expide con base en la historia ocupacional del usuario(a), la cual tiene carácter de confidencialidad.";
    }
}

TZDate.tz("America/Guayaquil");
const footer = (value: Pick<GenericRecord, 'authorDni' | 'authorFullname' | 'type'>) => {
    const date = new TZDate();
    const formatedDate = formatDate(date, 'yyyy/MM/dd');
    const formatedHour = formatDate(date, 'HH:mm');

    if (value.type === 'certificado') {
        return craftRow(
            craftCell("Nombres y Apellidos", {
                colSpan: 4,
                style: 'itemTitle'
            }),
            craftCell(`${value.authorFullname}`.replaceAll('  ', ' ').trim(), { colSpan: 12 }),
            craftCell("Código", {
                colSpan: 6,
                style: 'itemTitle'
            }),
            craftCell(value.authorDni, { colSpan: 10 }),
            craftCell("Firma y Sello", {
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
        craftCell("Fecha", {
            colSpan: 3,
            style: 'itemTitle'
        }),
        craftCell(formatedDate, { colSpan: 4 }),
        craftCell("Hora", {
            colSpan: 2,
            style: 'itemTitle'
        }),
        craftCell(formatedHour, { colSpan: 2 }),
        craftCell("Nombres y Apellidos", {
            colSpan: 4,
            style: 'itemTitle'
        }),
        craftCell(`${value.authorFullname}`.replaceAll('  ', ' ').trim(), { colSpan: 9 }),
        craftCell("Código", {
            colSpan: 3,
            style: 'itemTitle'
        }),
        craftCell(value.authorDni, { colSpan: 5 }),
        craftCell("Firma y Sello", {
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
                craftCell("Con este documento certifico que el trabajador se ha sometido a la evaluación médica requerida para (el ingreso, la ejecución, el reintegro y retiro) al puesto laboral, y que se le ha informado sobre los riesgos relacionados con el trabajo, emitiendo recomendaciones acordes a su estado de salud.", {
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
                craftCell("Datos del Profesional", {
                    colSpan: 50,
                    style: 'tableHeader',
                }),
                craftSpacing({ colSpan: 2, rowSpan: 2 }),
                craftCell("Firma Usuario", {
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