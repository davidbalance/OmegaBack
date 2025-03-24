import { RetirementRecord } from "@omega/medical/application/type/retirement-record";
import { CraftRecordFunc } from "./generic-record-helper";

export const createRetirementRecord: CraftRecordFunc<RetirementRecord> = (record: RetirementRecord, { clinicNumber, fileNumber, }) => [];

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
];

const medicalRetirementEvaluation: CratftRecordItemFunc<RetirementRecord> = (record, subheader): object => [
    {
        width: '*',
        table: {
            widths: ["*", "*"],
            body: [
                [
                    {
                        border: [true, true, false, true],
                        text: 'SE REALIZO LA EVALUACION',
                    },
                    {
                        border: [false, true, true, true],
                        text: record.retirementDone ? 'Si' : 'No',
                    }
                ],
            ]
        },
        layout: {
            fillColor: (_col, _node, rowIndex) => subheader(rowIndex)
        }
    },
    {
        width: '*',
        table: {
            widths: ["*", "*"],
            body: [
                [
                    {
                        border: [true, true, true, false],
                        style: 'descriptionItem',
                        text: 'Observaciones:',
                        colSpan: 2,
                    }, {}
                ],
                [
                    {
                        border: [true, false, true, true],
                        text: record.retirementObservation ?? '',
                        colSpan: 2,
                    }, {}
                ],
            ]
        },
    },
]; */