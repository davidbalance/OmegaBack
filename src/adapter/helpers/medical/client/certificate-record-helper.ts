import { formatDate } from "date-fns";
import { craftMedicalFitnessForJob, craftRecommendation, CraftRecordFunc, craftSpacing, CratftRecordItemFunc } from "./generic-record-helper";
import { CertificateRecord } from "@omega/medical/application/type/certificate-record";

export const createCertificateRecord: CraftRecordFunc<CertificateRecord> = (record: CertificateRecord, header, subheader) => [
    header('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
    institutionLayout(record, subheader),
    craftSpacing(),
    header('DATOS GENERALES'),
    generalDataLayout(record, subheader),
    craftSpacing(),
    header('APTITUD MÉDICA PARA EL TRABAJO'),
    craftMedicalFitnessForJob(record, subheader),
    craftSpacing(),
    header('EVALUACIÓN MÉDICA DE RETIRO'),
    retireEvaluation(record, subheader),
    craftSpacing(),
    header('RECOMENDACIONES Y/O TRATAMIENTO'),
    craftRecommendation(record),
    craftSpacing(),
];

const institutionLayout: CratftRecordItemFunc<CertificateRecord> = (record, subheader): any => [
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
                    '',
                    '',
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
            widths: ["*", "*", "*", "*", "*", "*"],
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
                        text: 'PUESTO DE TRABAJO (CIUO)',
                    }
                ],
                [
                    record.patientLastName,
                    record.patientSecondLastName,
                    record.patientFirstName,
                    record.patientMiddleName,
                    record.patientGender === 'male' ? 'Masculino' : 'Femenino',
                    record.jobPosition
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
];

const generalDataLayout: CratftRecordItemFunc<CertificateRecord> = (record, subheader): any => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["*", "*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'FECHA DE EMISIÓN:',
                    }, formatDate(new Date(), 'yyyy/MM/dd')
                ],
                [
                    {
                        style: 'itemHeader',
                        text: 'EVALUACIÓN:',
                    },
                    {
                        text: record.generalData === 'entry'
                            ? 'INGRESO'
                            : (record.generalData === 'periodic'
                                ? 'PERIODICO'
                                : (record.generalData === 'reintegrate'
                                    ? 'REINTEGRO'
                                    : 'RETIRO'
                                ))
                    }
                ],
            ]
        },
    }
];

const retireEvaluation: CratftRecordItemFunc<CertificateRecord> = (record, subheader): any => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["*", "*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'El usuario se realizó la evaluación médica de retiro',
                    },
                    {
                        text: record.retirementEvaluationDone ? 'Si' : 'No'
                    }
                ],
                [
                    {
                        style: 'itemHeader',
                        text: 'Condición del diagnóstico',
                    },
                    {
                        text: record.retirementEvaluationCondition === 'presuntive'
                            ? 'Presuntiva'
                            : (record.retirementEvaluationCondition === 'definitive'
                                ? 'Definitiva'
                                : 'No aplica'
                            )
                    }
                ],
                [
                    {
                        style: 'itemHeader',
                        text: 'La condición de salud esta relacionada con el trabajo ',
                    },
                    {
                        text: record.retirementEvaluationConditionWithJob === 'yes'
                            ? 'Si'
                            : (record.retirementEvaluationConditionWithJob === 'no'
                                ? 'No'
                                : 'No aplica'
                            )
                    }
                ]
            ]
        },
    }
];