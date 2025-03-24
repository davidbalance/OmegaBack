import { CraftRecordFunc } from "./generic-record-helper";
import { ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record";

export const createReintegrationRecord: CraftRecordFunc<ReintegrateRecord> = (record: ReintegrateRecord, { clinicNumber, fileNumber, }) => [];

/* export const createReintegrationRecord: CraftRecordFunc<ReintegrateRecord> = (record: ReintegrateRecord, {
    clinicNumber,
    fileNumber,
    headerLayout: header,
    subheaderLayout: subheader
}) => [
        header('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
        institutionLayout({ ...record, clinicNumber, fileNumber }, subheader),
        craftSpacing(),
        header('MOTIVO DE CONSULTA'),
        craftMedicalConsultation(record),
        craftSpacing(),
        header('ENFERMEDAD ACTUAL'),
        craftCurrentDisease(record),
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
        header('APTITUD MÉDICA PARA EL TRABAJO'),
        craftMedicalFitnessForJob(record, subheader),
        craftSpacing(),
        header('RECOMENDACIONES Y/O TRATAMIENTO'),
        craftRecommendation(record),
        craftSpacing(),
    ];

const institutionLayout: CratftRecordItemFunc<ReintegrateRecord & {
    clinicNumber: number;
    fileNumber: number;
}> = (record, subheader): any => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
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
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
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
                        text: 'EDAD (AÑOS)',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'PUESTO DE TRABAJO (CIUO)',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'FECHA DEL ÚLTIMO DÍA LABORAL',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'FECHA DE REINGRESO',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'TOTAL (DÍAS)',
                    },
                ],
                [
                    record.patientLastName,
                    record.patientSecondLastName,
                    record.patientFirstName,
                    record.patientMiddleName,
                    record.patientGender === 'male' ? 'Masculino' : 'Femenino',
                    record.patientAge,
                    record.jobPosition,
                    formatDate(record.workingEndDate, 'yyyy/MM/dd'),
                    formatDate(record.workingReintegrationDate, 'yyyy/MM/dd'),
                    record.workingTime,
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
            widths: ["*"],
            body: [
                [
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'CAUSA DE SALIDA',
                    },
                ],
                [
                    record.workingLeftCause,
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    }
]; */