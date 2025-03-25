import { RetirementRecord } from "@omega/medical/application/type/retirement-record";
import { craftDiagnosticHeader, CraftItemFunc, craftJobAccident, craftLabel, craftMedicalAndSurgicalHistory, craftMedicalDiagnostic, craftOccupationalDisease, craftPhysicalRegionalExam, craftRecommendation, CraftRecordFunc, craftSpecificAndGeneralResults, craftVitalSignsAndAnthropometry, flatRecord } from "../generic-record-helper";
import { craftCell, craftHeader, craftRow, craftSpacing, craftTitle, emptyCell, Row } from "../table.helper";
import { formatDate } from "date-fns";

export const createRetirementRecord: CraftRecordFunc<RetirementRecord> = (record: RetirementRecord, { clinicNumber, fileNumber, }) => flatRecord([
    craftHeader('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
    institutionLayout({ ...record, clinicNumber, fileNumber }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('ANTECEDENTES PERSONALES'),
    craftMedicalAndSurgicalHistory(record),
    craftJobAccident(record),
    craftOccupationalDisease(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('CONSTANTES VITALES Y ANTROPOMETRÍA'),
    craftVitalSignsAndAnthropometry(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('EXAMEN FÍSICO REGIONAL'),
    craftPhysicalRegionalExam(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('RESULTADOS DE EXÁMENES GENERALES Y ESPECÍFICOS DE ACUERDO AL RIESGO Y PUESTO DE TRABAJO (IMAGEN, LABORATORIO Y OTROS)'),
    craftSpecificAndGeneralResults(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftDiagnosticHeader(),
    craftMedicalDiagnostic(record.diagnostics),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('EVALUACIÓN MÉDICA DE RETIRO'),
    medicalRetirementEvaluation(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('RECOMENDACIONES Y/O TRATAMIENTO'),
    craftRecommendation(record)
]);

const institutionLayout: CraftItemFunc<RetirementRecord & {
    clinicNumber: number;
    fileNumber: number;
}> = (record) => [
    craftRow(
        craftTitle('INSTITUCIÓN DEL SISTEMA O NOMBRE DE LA EMPRESA', { colSpan: 16 }),
        craftTitle('RUC', { colSpan: 10 }),
        craftTitle('CIU', { colSpan: 5 }),
        craftTitle('ESTABLECIMIENTO DE SALUD', { colSpan: 15 }),
        craftTitle('NÚMERO DE HISTORIA CLÍNICA', { colSpan: 14 }),
        craftTitle('NÚMERO DE ARCHIVO', { colSpan: 10 }),
    ),
    craftRow(
        craftCell(record.companyName, { colSpan: 16 }),
        craftCell(record.companyRUC, { colSpan: 10 }),
        craftCell(record.companyCIU, { colSpan: 5 }),
        craftCell(record.institutionHealthFacility, { colSpan: 15 }),
        craftCell(record.clinicNumber.toString().padStart(12, '0'), { colSpan: 14 }),
        craftCell(record.fileNumber.toString().padStart(12, '0'), { colSpan: 10 }),
    ),
    craftRow(
        craftTitle('PRIMER APELLIDO', { colSpan: 8 }),
        craftTitle('SEGUNDO APELLIDO', { colSpan: 8 }),
        craftTitle('PRIMER NOMBRE', { colSpan: 8 }),
        craftTitle('SEGUNDO NOMBRE', { colSpan: 8 }),
        craftTitle('SEXO', { colSpan: 6 }),
        craftTitle('FECHA DE INICIO DE LABORES', { colSpan: 8 }),
        craftTitle('FECHA DE SALIDA', { colSpan: 8 }),
        craftTitle('TIEMPO (meses)', { colSpan: 8 }),
        craftTitle('PUESTO DE TRABAJO (CIUO)', { colSpan: 8 }),
    ),
    craftRow(
        craftCell(record.patientLastName, { colSpan: 8 }),
        craftCell(record.patientSecondLastName, { colSpan: 8 }),
        craftCell(record.patientFirstName, { colSpan: 8 }),
        craftCell(record.patientMiddleName, { colSpan: 8 }),
        craftCell(record.patientGender === 'male' ? 'Masculino' : 'Femenino', { colSpan: 6, fontSize: 5 }),
        craftCell(formatDate(record.workStartDate, 'yyyy/MM/dd'), { colSpan: 8 }),
        craftCell(formatDate(record.workingEndDate, 'yyyy/MM/dd'), { colSpan: 8 }),
        craftCell(record.workingTime.toString(), { colSpan: 8 }),
        craftCell(record.jobPosition, { colSpan: 8 }),
    ),
    craftRow(
        craftTitle('ACTIVIDADES', { colSpan: 15 }),
        craftTitle('FACTORES DE RIESGO', { colSpan: 55 }),
    ),
    ...record.institutionActivities.map(e => craftRow(
        craftCell(e.activity, { colSpan: 15 }),
        craftCell(e.risk, { colSpan: 55 }),
    ),)
];

const medicalRetirementEvaluation: CraftItemFunc<RetirementRecord> = (record): Row[] => [
    craftRow(
        craftTitle('SE REALIZÓ LA EVALUACIÓN', { colSpan: 15 }),
        craftTitle('SI', { colSpan: 5 }),
        craftCell(record.retirementDone ? 'x' : '', { colSpan: 5 }),
        craftTitle('NO', { colSpan: 5 }),
        craftCell(!record.retirementDone ? 'x' : '', { colSpan: 5 }),
        emptyCell({ colSpan: 35 })
    ),
    craftLabel('Observaciones'),
    craftRow(craftCell(record.retirementObservation, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];

/* export const createRetirementRecord: CraftRecordFunc<RetirementRecord> = (record: RetirementRecord, {
    clinicNumber,
    fileNumber,
    headerLayout: header,
    subheaderLayout: subheader
}) => [
        header('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
        institutionLayout({ ...record, clinicNumber, fileNumber }, subheader),
        craftSpacing(),
        header('ANTECEDENTES PERSONALES'),
        craftMedicalAndSurgicalHistory(record, subheader),
        craftJobAccident(record, subheader),
        craftOccupationalDisease(record, subheader),
        craftSpacing(),
        header('CONSTANTES VITALES Y ANTROPOMETRÍA'),
        craftVitalSignsAndAnthropometry(record, subheader),
        craftSpacing(),
        header('EXAMEN FÍSICO REGIONAL'),
        craftPhysicalRegionalExam(record, subheader),
        craftSpacing(),
        header('RESULTADOS DE EXÁMENES GENERALES Y ESPECÍFICOS DE ACUERDO AL RIESGO Y PUESTO DE TRABAJO (IMAGEN, LABORATORIO Y OTROS)'),
        craftSpecificAndGeneralResults(record, subheader),
        craftSpacing(),
        header('DIAGNÓSTICO'),
        craftMedicalDiagnostic(record.diagnostics, subheader),
        craftSpacing(),
        header('EVALUACIÓN MÉDICA DE RETIRO'),
        medicalRetirementEvaluation(record, subheader),
        craftSpacing(),
        header('RECOMENDACIONES Y/O TRATAMIENTO'),
        craftRecommendation(record),
        craftSpacing(),
    ];

const institutionLayout: CratftRecordItemFunc<RetirementRecord & {
    clinicNumber: number;
    fileNumber: number;
}> = (record, subheader): any => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["*", "*", "*", "*", "*", "*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'INSTITUCIÓN DEL SISTEMA O NOMBRE DE LA EMPRESA',
                    },
                    {
                        style: 'itemHeader',
                        text: 'RUC',
                    },
                    {
                        style: 'itemHeader',
                        text: 'CIU',
                    },
                    {
                        style: 'itemHeader',
                        text: 'ESTABLECIMIENTO DE SALUD',
                    },
                    {
                        style: 'itemHeader',
                        text: 'NÚMERO DE HISTORIA CLÍNICA',
                    },
                    {
                        style: 'itemHeader',
                        text: 'NÚMERO DE ARCHIVO',
                    }
                ],
                [
                    record.companyName,
                    record.companyRUC,
                    record.companyCIU,
                    record.institutionHealthFacility,
                    record.clinicNumber.toString().padStart(12, '0'),
                    record.fileNumber.toString().padStart(12, '0'),
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
    {
        width: '*',
        table: {
            widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
            body: [
                [
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'PRIMER APELLIDO ',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'SEGUNDO APELLIDO ',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'PRIMER NOMBRE',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'SEGUNDO NOMBRE',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'SEXO ',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'FECHA DE INICIO DE LABORES',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'FECHA DE SALIDA',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'TIEMPO (meses)',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'PUESTO DE TRABAJO (CIUO)',
                    },
                ],
                [
                    record.patientLastName,
                    record.patientSecondLastName,
                    record.patientFirstName,
                    record.patientMiddleName,
                    record.patientGender === 'male' ? 'Masculino' : 'Femenino',
                    formatDate(record.workStartDate, 'yyyy/MM/dd'),
                    formatDate(record.workingEndDate, 'yyyy/MM/dd'),
                    record.workingTime,
                    record.jobPosition,
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
    {
        width: '*',
        table: {
            widths: ["*", "*"],
            body: [
                [
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'ACTIVIDADES',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'FACTORES DE RIESGO',
                    },
                ],
                ...record.institutionActivities.map(e => [
                    e.activity,
                    e.risk
                ])
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
]; */