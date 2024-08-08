import { Content, TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportContent {
    header: string;
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
    pageMargins: [30, 200],
    content: {
        stack: [
            body
        ],
    },
    header: [
        {
            image: data.header,
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
                                { text: data.date, style: 'fieldText' }
                            ],
                            style: 'field'
                        },
                        {
                            text: [
                                { text: `INSTITUCIÓN: `, style: 'fieldTitle' },
                                { text: data.company, style: 'fieldText' }
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
                    { text: `Dr/a. ${data.doctorFullname}`, style: 'doctor' },
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
        if(!Array.isArray(currentNode.text)) return false;
        const actualNode: any = currentNode.text[0];
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
    },
});