import { differenceInYears, formatDate, getDate, getMonth, getYear } from "date-fns";

type FemoPersonalHistoryExam = {
    exam: string;
    time: string;
    results: string;
}

type FemoLifeStyle = {
    substanceConsumption: {
        substance: string;
        consumptionTime: string;
        exConsumer: boolean;
        abstinenceMonths: string;
        doesNotConsume: boolean;
    };
    lifestyle: {
        activity: string;
        duration: string;
    };
    preexistingCondition: {
        medication: string;
        quantity: string;
    };
}

type FemoRiskFactorItem = {
    subCategory?: string;
    subCategorySpan?: number;
    label: string;
    isText?: boolean;
    values: (boolean | string)[];
}

type TemplateFemo = {
    logo: string | null | undefined;
    establishment: {
        institutionName: string;
        ruc: string;
        ciiu: string;
        healthFacility: string;
        clinicalHistoryNumber: string;
        fileNumber: string;
    };

    patient: {
        firstName: string;
        middleName: string;
        lastName: string;
        secondLastName: string;
        priorityGroup: {
            pregnant: boolean;
            disability: boolean;
            catastrophicIllness: boolean;
            elderly: boolean;
        };
        isMale: boolean;
        isFemale: boolean;
        birthDate: {
            year: string;
            month: string;
            day: string;
        };
        age: number;
        bloodGroup: string;
        laterality: string;
    };

    consultation: {
        jobPosition: string;
        serviceDate: string;
        work: {
            startDate: string;
            returnDate: string;
            lastDate: string;
        };
        evaluationType: {
            isEntry: boolean;
            isPeriodic: boolean;
            isReturn: boolean;
            isRetirement: boolean;
        };
        observation: string;
    };

    personalHistory: {
        clinicalAndSurgical: string;
        familyHistory: string;
        specialConditions: {
            allowsTransfusions: boolean;
            hormoneTherapyAffirmative: boolean;
            hormoneTherapyNegative: boolean;
            hormoneTherapyNoAnswer: boolean;
            hormoneTherapyDetails: string;
        };
        gynecological: {
            lastMenstruationDate: string;
            pregnancies: number;
            births: number;
            cesareans: number;
            abortions: number;
            familyPlanning: {
                uses: boolean;
                method: string;
                doesNotUse: boolean;
                noResponse: boolean;
            };
            exams: FemoPersonalHistoryExam[];
        };
        maleReproductive: {
            exams: FemoPersonalHistoryExam[];
        };
        lifeStyle: FemoLifeStyle[];
        observations: string;
    };

    currentDisease: {
        description: string;
    };

    vitalSigns: {
        temperature: string;
        bloodPressure: string;
        heartRate: string;
        respiratoryRate: string;
        oxygenSaturation: string;
        weight: string;
        height: string;
        bmi: string;
        abdominalPerimeter: string;
    };

    physicalExam: {
        region: {
            skin: {
                scars: boolean;
                appendages: boolean;
            };
            eye: {
                eyelids: boolean;
                conjunctiva: boolean;
                pupils: boolean;
                cornea: boolean;
                motility: boolean;
            };
            ear: {
                externalAuditoryCanal: boolean;
                auricle: boolean;
                eardrums: boolean;
            };
            oropharynx: {
                lips: boolean;
                tongue: boolean;
                pharynx: boolean;
                tonsils: boolean;
                teeth: boolean;
            };
            nose: {
                septum: boolean;
                turbinates: boolean;
                mucosa: boolean;
                paranasalSinuses: boolean;
            };
            neck: {
                thyroid: boolean;
                mobility: boolean;
            };
            thorax: {
                breasts: boolean;
                lungs: boolean;
                heart: boolean;
                ribCage: boolean;
            };
            abdomen: {
                viscera: boolean;
                abdominalWall: boolean;
            };
            spine: {
                flexibility: boolean;
                deviation: boolean;
                pain: boolean;
            };
            pelvis: {
                pelvis: boolean;
                genitals: boolean;
            };
            extremities: {
                vascular: boolean;
                upperLimbs: boolean;
                lowerLimbs: boolean;
            };
            neurological: {
                strength: boolean;
                sensation: boolean;
                gait: boolean;
                reflexes: boolean;
            };
        };
        regionsObservations: string;
        examObservation: string;
    };

    riskFactors: {
        jobPosition: string;
        activitiesRange: number[];
        activities: string[]
        sections: {
            title: string;
            rowCount: number;
            colspan: number;
            items: FemoRiskFactorItem[];
        }[];
        preventiveMeasures: string[];
    };

    employmentHistory: {
        workplace: string;
        activities: string;
        lastWork: string;
        currentWork: string;
        duration: string;
        incident: string;
        accident: string;
        disease: string;
        isQualified: boolean;
        notQualified: boolean;
        date: string;
        specification: string;
        observations: string;
    }[]

    extraLaboralActivities: {
        description: string;
        date: string;
    }[];

    examResults: {
        exams: {
            name: string;
            date: string;
            results: string;
        }[];
        observations: string;
    };

    diagnoses: {
        index: number
        cie: string;
        description: string;
        presumptive: boolean;
        definitive: boolean;
    }[];

    medicalAptitude: {
        isFit: boolean;
        isFitObservations: boolean;
        isFitLimitations: boolean;
        isNotFit: boolean;
        observations: string;
    };

    recommendation: {
        description: string;
    };

    retirementEvaluation: {
        isPerformed: boolean;
        isNotPerformed: boolean;
        isWorkRelated: boolean;
        isNotWorkRelated: boolean;
        observation: string;
    };

    professionalData: {
        fullName: string;
        medicalCode: string;
    };
};

const FORMAT_DATE = "yyyy/MM/dd"
const MAX_DIAGNOSES_LENGTH: number = 6;
const MAX_PATIENT_HISTORY_EXAM_LENGTH: number = 2;
const MAX_EXAM_RESULT_LENGTH: number = 6;
const MAX_EMPLOYEMENT_HISTORY_LENGTH: number = 19;
const MAX_EXTRA_LABORAL_ACTIVITIES_LENGTH: number = 3;
const MAX_LIFE_STYLE_LENGTH: number = 3;
const MAX_RISK_FACTOR_LENGTH: number = 7;

const RISK_FACTOR_PHYSICAL = "Físico"
const RISK_FACTOR_SAFETY = "De Seguridad"
const RISK_FACTOR_CHEMICAL = "Químico"
const RISK_FACTOR_BIOLOGICAL = "Biológico"
const RISK_FACTOR_ERGONOMIC = "Ergonómico"
const RISK_FACTOR_PSYCHOSOCIAL = "Psicosocial"

const RISK_FACTORS = [RISK_FACTOR_PHYSICAL, RISK_FACTOR_SAFETY, RISK_FACTOR_CHEMICAL, RISK_FACTOR_BIOLOGICAL, RISK_FACTOR_ERGONOMIC, RISK_FACTOR_PSYCHOSOCIAL]

const mapFemoDiagnoses = (diagnoses: any): TemplateFemo["diagnoses"] => {
    const base: TemplateFemo["diagnoses"] = Array<TemplateFemo["diagnoses"][0]>(MAX_DIAGNOSES_LENGTH).fill({
        index: 0,
        cie: "",
        description: "",
        presumptive: false,
        definitive: false
    })
    const mapped: TemplateFemo["diagnoses"] = diagnoses && Array.isArray(diagnoses) ? diagnoses.map(e => ({
        index: 0,
        cie: e.cie,
        description: e.description,
        presumptive: e.diagnosis === 'pre',
        definitive: e.diagnosis === 'def'
    })) : [];

    return [...mapped, ...base].slice(0, MAX_DIAGNOSES_LENGTH).map((e, i) => ({
        ...e,
        index: i + 1
    }))
}

const mapFemoExamResults = (exams: any): TemplateFemo["examResults"]["exams"] => {
    const base: TemplateFemo["examResults"]["exams"] = Array<TemplateFemo["examResults"]["exams"][0]>(MAX_EXAM_RESULT_LENGTH).fill({
        name: "",
        date: "",
        results: "",
    })
    const mapped: TemplateFemo["examResults"]["exams"] = exams && Array.isArray(exams) ? exams.map(e => ({
        name: e.name ?? "",
        date: e.date ? formatDate(e?.date, FORMAT_DATE) : "",
        results: e.result ?? ""
    })) : [];

    return [...mapped, ...base].slice(0, MAX_EXAM_RESULT_LENGTH)
}

const mapFemoEmploymentHistory = (history: any): TemplateFemo["employmentHistory"] => {
    const base: TemplateFemo["employmentHistory"] = Array<TemplateFemo["employmentHistory"][0]>(MAX_EMPLOYEMENT_HISTORY_LENGTH).fill({
        workplace: "",
        activities: "",
        lastWork: "",
        currentWork: "",
        duration: "",
        incident: "",
        accident: "",
        disease: "",
        isQualified: false,
        notQualified: false,
        date: "",
        specification: "",
        observations: ""
    })
    const mapped: TemplateFemo["employmentHistory"] = history && Array.isArray(history) ? history.map(e => ({
        workplace: e?.workplace ?? "",
        activities: e?.activities ?? "",
        lastWork: e?.lastWork ?? "",
        currentWork: e?.currentWork ?? "",
        duration: e?.duration ?? "",
        incident: e?.incident ?? "",
        accident: e?.accident ?? "",
        disease: e?.disease ?? "",
        isQualified: e?.isQualified,
        notQualified: e?.notQualified,
        date: e?.date ? formatDate(e.date, FORMAT_DATE) : "",
        specification: e?.specification,
        observations: e?.observations,
    })) : [];

    return [...mapped, ...base].slice(0, MAX_EMPLOYEMENT_HISTORY_LENGTH)
}

const mapFemoExtraLaboralActivities = (activities: any): TemplateFemo["extraLaboralActivities"] => {
    const base: TemplateFemo["extraLaboralActivities"] = Array<TemplateFemo["extraLaboralActivities"][0]>(MAX_EXTRA_LABORAL_ACTIVITIES_LENGTH).fill({
        description: "",
        date: ""
    })
    const mapped: TemplateFemo["extraLaboralActivities"] = activities && Array.isArray(activities) ? activities.map(e => ({
        description: e?.description ?? "",
        date: e?.date ? formatDate(e?.date, FORMAT_DATE) : "",
    })) : [];

    return [...mapped, ...base].slice(0, MAX_EXTRA_LABORAL_ACTIVITIES_LENGTH)
}

const regionMap: Record<string, string> = {
    scars: "Cicatrices",
    appendages: "Piel y Faneras",
    eyelids: "Párpados",
    conjunctiva: "Conjuntivas",
    pupils: "Pupilas",
    cornea: "Córneas",
    motility: "Motilidad",
    externalAuditoryCanal: "C. Auditivo Ext.",
    auricle: "Pabellón",
    eardrums: "Tímpanos",
    lips: "Labios",
    tongue: "Lengua",
    pharynx: "Faringe",
    tonsils: "Amígdalas",
    teeth: "Dentadura",
    septum: "Tabique",
    turbinates: "Cornetes",
    mucosa: "Mucosas",
    paranasalSinuses: "Senos Paranasales",
    thyroid: "Tiroides/masas",
    mobility: "Movilidad",
    breasts: "Mamas",
    lungs: "Pulmones",
    heart: "Corazón",
    ribCage: "Parrilla Costal",
    viscera: "Vísceras",
    abdominalWall: "Pared Abdominal",
    flexibility: "Flexibilidad",
    deviation: "Desviación",
    pain: "Dolor",
    pelvis: "Pelvis",
    genitals: "Genitales",
    vascular: "Vascular",
    upperLimbs: "Miembros Sup.",
    lowerLimbs: "Miembros Inf.",
    strength: "Fuerza",
    sensation: "Sensibilidad",
    gait: "Marcha",
    reflexes: "Reflejos",
}

const mapFemoRegionObservation = (region: any): string => Object.
    entries(region).
    map(([_, value]) => Object.
        entries(value as any).
        filter(([key, description]) => key in regionMap && !!description).
        map(([key, description]) => `${regionMap[key]}: ${description}`)).
    reduce((acc, curr) => [...acc, ...curr], []).
    join("<br />")

const mapFemoLifeStyle = (toxicHabit: any, lifeStyles: any, preexistingConditions: any): FemoLifeStyle[] => {
    const base: FemoLifeStyle[] = Array<FemoLifeStyle>(MAX_LIFE_STYLE_LENGTH).fill({
        substanceConsumption: {
            substance: "",
            consumptionTime: "",
            exConsumer: false,
            abstinenceMonths: "",
            doesNotConsume: false
        },
        lifestyle: {
            activity: "",
            duration: ""
        },
        preexistingCondition: {
            medication: "",
            quantity: ""
        }
    })

    const toxicHabitArr: any[] = toxicHabit ? Object.values(toxicHabit) : [];
    const lifeStyleArr = lifeStyles && Array.isArray(lifeStyles) ? lifeStyles : [lifeStyles];
    const preexistingConditionArr = preexistingConditions && Array.isArray(preexistingConditions) ? preexistingConditions : [preexistingConditions];

    const mapped: FemoLifeStyle[] = Array.from({ length: MAX_LIFE_STYLE_LENGTH }).fill("").map<FemoLifeStyle>((_, i) => ({
        substanceConsumption: {
            substance: toxicHabitArr[i]?.name ?? "",
            abstinenceMonths: toxicHabitArr[i]?.abstinenceDuration ?? "",
            consumptionTime: toxicHabitArr[i]?.substanceUseDuration ?? "",
            doesNotConsume: toxicHabitArr[i]?.status === "NON_USER",
            exConsumer: toxicHabitArr[i]?.status === "FORMER_USER",
        },
        lifestyle: {
            activity: lifeStyleArr[i]?.type ?? "",
            duration: lifeStyleArr[i]?.duration ?? "",
        },
        preexistingCondition: {
            medication: preexistingConditionArr[i]?.type ?? "",
            quantity: preexistingConditionArr[i]?.duration ?? "",
        }
    }))

    const temp = [...mapped, ...base].slice(0, MAX_LIFE_STYLE_LENGTH)

    const substance = temp[MAX_LIFE_STYLE_LENGTH - 1].substanceConsumption;
    substance.substance = `OTRAS: ¿Cúal? ${substance.substance}`;

    temp[MAX_LIFE_STYLE_LENGTH - 1].substanceConsumption = substance;

    return temp;
}

const mapFemoRiskFactorSections = (riskFactors: any): TemplateFemo["riskFactors"]["sections"] => {
    if (!riskFactors || !Array.isArray(riskFactors)) return []

    const booleanArr: boolean[] = Array(MAX_RISK_FACTOR_LENGTH).fill(false);
    const otherArr: string[] = Array(MAX_RISK_FACTOR_LENGTH).fill("");

    return [
        {
            title: "Físico",
            rowCount: 10,
            colspan: 2,
            items: [
                { label: "Temperaturas altas", values: riskFactors.map(e => e?.physical.highTemperature ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Temperaturas bajas", values: riskFactors.map(e => e?.physical.lowTemperature ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Radiación Ionizante", values: riskFactors.map(e => e?.physical.ionizingRadiation ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Radiación No Ionizante", values: riskFactors.map(e => e?.physical.nonIonizingRadiation ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Ruido", values: riskFactors.map(e => e?.physical.noise ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Vibración", values: riskFactors.map(e => e?.physical.vibration ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Iluminación", values: riskFactors.map(e => e?.physical.lighting ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Ventilación", values: riskFactors.map(e => e?.physical.ventilation ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Fluido eléctrico", values: riskFactors.map(e => e?.physical.electricCurrent ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Otros _________", isText: true, values: riskFactors.map(e => e?.physical.other ?? false).concat(...otherArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
            ]
        },
        {
            title: "De Seguridad",
            rowCount: 15,
            colspan: 1,
            items: [
                {
                    subCategory: "Locativos",
                    subCategorySpan: 1,
                    label: "Falta de señalización, aseo, desorden",
                    values: riskFactors.map(e => e?.safety.locative.missingSignageCleaningDisorder ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH)
                },
                {
                    subCategory: "Mecánicos",
                    subCategorySpan: 12,
                    label: "Atrapamiento entre Máquinas y/o superficies",
                    values: riskFactors.map(e => e?.safety.locative.missingSignageCleaningDisorder ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH)
                },
                { label: "Atrapamiento entre objetos", values: riskFactors.map(e => e?.safety.mechanical.machineOrSurfaceEntrapment ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Caída de objetos", values: riskFactors.map(e => e?.safety.mechanical.fallingObjects ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Caídas al mismo nivel", values: riskFactors.map(e => e?.safety.mechanical.fallsSameLevel ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Caídas a diferente nivel", values: riskFactors.map(e => e?.safety.mechanical.fallsDifferentLevel ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Pinchazos", values: riskFactors.map(e => e?.safety.mechanical.punctures ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Cortes", values: riskFactors.map(e => e?.safety.mechanical.cuts ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Choques /colisión vehicular", values: riskFactors.map(e => e?.safety.mechanical.vehicleCollision ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Atropellamientos por vehículos", values: riskFactors.map(e => e?.safety.mechanical.vehicleRunOver ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Proyección de fluidos", values: riskFactors.map(e => e?.safety.mechanical.fluidProjection ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Proyección de partículas - fragmentos", values: riskFactors.map(e => e?.safety.mechanical.particleProjection ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Contacto con superficies de trabajos", values: riskFactors.map(e => e?.safety.mechanical.contactWithWorkSurfaces ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                {
                    subCategory: "Eléctrico",
                    subCategorySpan: 1,
                    label: "Contacto eléctrico",
                    values: riskFactors.map(e => e?.safety.electrical.electricalContact ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH)
                },
                {
                    subCategory: "Otros",
                    subCategorySpan: 1,
                    label: "__________",
                    isText: true,
                    values: riskFactors.map(e => e?.safety.other ?? false).concat(...otherArr).slice(0, MAX_RISK_FACTOR_LENGTH)
                },
            ]
        },
        {
            title: "Químico",
            rowCount: 9,
            colspan: 2,
            items: [
                { label: "Polvos", values: riskFactors.map(e => e?.chemical.dust ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Sólidos", values: riskFactors.map(e => e?.chemical.solids ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Humos", values: riskFactors.map(e => e?.chemical.smoke ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "líquidos", values: riskFactors.map(e => e?.chemical.liquids ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "vapores", values: riskFactors.map(e => e?.chemical.vapors ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Aerosoles", values: riskFactors.map(e => e?.chemical.aerosols ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Neblinas", values: riskFactors.map(e => e?.chemical.mists ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Gaseosos", values: riskFactors.map(e => e?.chemical.gases ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Otros __________", isText: true, values: riskFactors.map(e => e?.chemical.other ?? false).concat(...otherArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
            ]
        },
        {
            title: "Biológico",
            rowCount: 7,
            colspan: 2,
            items: [
                { label: "Virus", values: riskFactors.map(e => e?.biological.virus ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Hongos", values: riskFactors.map(e => e?.biological.fungi ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Bacterias", values: riskFactors.map(e => e?.biological.bacteria ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Parásitos", values: riskFactors.map(e => e?.biological.parasites ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Exposición a vectores", values: riskFactors.map(e => e?.biological.vectorExposure ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Exposición a animales selváticos", values: riskFactors.map(e => e?.biological.wildAnimalExposure ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Otros __________", isText: true, values: riskFactors.map(e => e?.biological.other ?? false).concat(...otherArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
            ]
        },
        {
            title: "Ergonómico",
            rowCount: 6,
            colspan: 2,
            items: [
                { label: "Manejo manual de cargas", values: riskFactors.map(e => e?.ergonomic.manualHandling ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Movimiento repetitivos", values: riskFactors.map(e => e?.ergonomic.repetitiveMovements ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Posturas forzadas", values: riskFactors.map(e => e?.ergonomic.forcedPostures ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Trabajos con PVD", values: riskFactors.map(e => e?.ergonomic.pvdWork ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Diseño Inadecuado del puesto", values: riskFactors.map(e => e?.ergonomic.poorWorkstationDesign ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Otros __________", isText: true, values: riskFactors.map(e => e?.ergonomic.other ?? false).concat(...otherArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
            ]
        },
        {
            title: "Psicosocial",
            rowCount: 14,
            colspan: 2,
            items: [
                { label: "Monotonía del trabajo", values: riskFactors.map(e => e?.psychosocial.monotony ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Sobrecarga laboral", values: riskFactors.map(e => e?.psychosocial.workOverload ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Minuciosidad de la tarea", values: riskFactors.map(e => e?.psychosocial.taskDetail ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Alta responsabilidad", values: riskFactors.map(e => e?.psychosocial.highResponsibility ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Autonomía en la toma de decisiones", values: riskFactors.map(e => e?.psychosocial.decisionAutonomy ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Supervisión y estilos de dirección deficiente", values: riskFactors.map(e => e?.psychosocial.poorSupervision ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Conflicto de rol", values: riskFactors.map(e => e?.psychosocial.roleConflict ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Falta de Claridad en las funciones", values: riskFactors.map(e => e?.psychosocial.unclearResponsibilities ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Incorrecta distribución del trabajo", values: riskFactors.map(e => e?.psychosocial.poorTaskDistribution ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Turnos rotativos", values: riskFactors.map(e => e?.psychosocial.rotatingShifts ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Relaciones interpersonales", values: riskFactors.map(e => e?.psychosocial.interpersonalRelations ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "inestabilidad laboral", values: riskFactors.map(e => e?.psychosocial.jobInstability ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Amenaza Delincuencial", values: riskFactors.map(e => e?.psychosocial.criminalThreat ?? false).concat(...booleanArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
                { label: "Otros __________", isText: true, values: riskFactors.map(e => e?.psychosocial.other ?? false).concat(...otherArr).slice(0, MAX_RISK_FACTOR_LENGTH) },
            ]
        },
    ]
}

const mapFemoRiskFactorActivities = (riskFactors: any): TemplateFemo["riskFactors"]["activities"] => {
    const base: string[] = Array(MAX_RISK_FACTOR_LENGTH).fill("");
    if (!riskFactors || !Array.isArray(riskFactors)) return base;

    return riskFactors.map(e => e.activity ?? "").concat(...Array(MAX_RISK_FACTOR_LENGTH).fill("")).slice(0, MAX_RISK_FACTOR_LENGTH)
}

const mapFemoRiskFactorPreventiveMeasures = (riskFactors: any): TemplateFemo["riskFactors"]["preventiveMeasures"] => {
    const base: string[] = Array(MAX_RISK_FACTOR_LENGTH).fill("");
    if (!riskFactors || !Array.isArray(riskFactors)) return base;

    return riskFactors.map(e => e.preventiveMeasure ?? "").concat(...Array(MAX_RISK_FACTOR_LENGTH).fill("")).slice(0, MAX_RISK_FACTOR_LENGTH)
}

const defaultGynecological: TemplateFemo["personalHistory"]["gynecological"] = {
    lastMenstruationDate: "",
    pregnancies: 0,
    births: 0,
    cesareans: 0,
    abortions: 0,
    familyPlanning: {
        uses: false,
        method: "",
        doesNotUse: false,
        noResponse: false
    },
    exams: Array<FemoPersonalHistoryExam>(MAX_PATIENT_HISTORY_EXAM_LENGTH).fill({
        exam: "",
        time: "",
        results: ""
    })
}

const mapFemoPersonalHistoryExam = (exam: any) => {
    const base: FemoPersonalHistoryExam[] = Array<FemoPersonalHistoryExam>(MAX_PATIENT_HISTORY_EXAM_LENGTH).fill({
        exam: "",
        time: "",
        results: ""
    })
    const mapped: FemoPersonalHistoryExam[] = exam && Array.isArray(exam) ? exam.map(e => ({
        exam: e?.exam ?? "",
        time: e?.time ?? "",
        results: e?.resultRecorded ?? "",
    })) : [];

    return [...mapped, ...base].slice(0, MAX_PATIENT_HISTORY_EXAM_LENGTH)
}

const mapFemoGynecological = (personalHistory: any, isMale: boolean): TemplateFemo["personalHistory"]["gynecological"] => {
    if (isMale || !personalHistory) return defaultGynecological;

    return {
        lastMenstruationDate: formatDate(personalHistory?.gynecological.lastMenstruationDate, FORMAT_DATE),
        pregnancies: personalHistory?.gynecological.pregnancies ?? 0,
        births: personalHistory?.gynecological.births ?? 0,
        cesareans: personalHistory?.gynecological.cesareans ?? 0,
        abortions: personalHistory?.gynecological.abortions ?? 0,
        familyPlanning: {
            uses: personalHistory?.familyPlanning.status === "yes",
            method: personalHistory?.familyPlanning.detail,
            doesNotUse: personalHistory?.familyPlanning.status === "no",
            noResponse: personalHistory?.familyPlanning.status === "do-not-answer"
        },
        exams: mapFemoPersonalHistoryExam(personalHistory?.exams)
    };
}

const defaultMaleReproductive: TemplateFemo["personalHistory"]["maleReproductive"] = {
    exams: Array<FemoPersonalHistoryExam>(MAX_PATIENT_HISTORY_EXAM_LENGTH).fill({
        exam: "",
        time: "",
        results: ""
    })
}

const mapFemoMaleReproductive = (personalHistory: any, isMale: boolean): TemplateFemo["personalHistory"]["maleReproductive"] => {
    if (!isMale || !personalHistory) return defaultMaleReproductive;

    return {
        exams: mapFemoPersonalHistoryExam(personalHistory?.exams)
    };
}

export const mapMetadataToFemo = (metadata: any): object => {

    const isMale: boolean = metadata?.patient.gender === "male"

    return {
        logo: metadata.base64Logo ?? null,
        establishment: {
            institutionName: metadata?.establishment.institutionName ?? "",
            ruc: metadata?.establishment.ruc ?? "",
            ciiu: metadata?.establishment.ciiu ?? "",
            healthFacility: metadata?.establishment.healthFacility ?? "",
            clinicalHistoryNumber: metadata?.establishment.clinicalHistoryNumber ?? "",
            fileNumber: metadata?.establishment.fileNumber ?? "",
        },
        patient: {
            firstName: metadata?.patient.firstName ?? "",
            middleName: metadata?.patient.middleName ?? "",
            lastName: metadata?.patient.lastName ?? "",
            secondLastName: metadata?.patient.secondLastName ?? "",
            priorityGroup: {
                pregnant: metadata?.patient.priorityGroup && Array.isArray(metadata.patient.priorityGroup) && metadata.patient.priorityGroup.includes("pregnant"),
                disability: metadata?.patient.priorityGroup && Array.isArray(metadata.patient.priorityGroup) && metadata.patient.priorityGroup.includes("disability"),
                catastrophicIllness: metadata?.patient.priorityGroup && Array.isArray(metadata.patient.priorityGroup) && metadata.patient.priorityGroup.includes("catastrofic-illness"),
                elderly: metadata?.patient.priorityGroup && Array.isArray(metadata.patient.priorityGroup) && metadata.patient.priorityGroup.includes("elderly"),
            },
            isMale,
            isFemale: !isMale,
            birthDate: {
                year: getYear(metadata?.patient.birthDate).toString(),
                month: getMonth(metadata?.patient.birthDate).toString(),
                day: getDate(metadata?.patient.birthDate).toString(),
            },
            age: differenceInYears(new Date(), metadata?.patient.birthDate),
            bloodGroup: metadata?.patient.bloodGroup ?? "",
            laterality: metadata?.patient.laterality === "right" ? "Diestro" : "Zurdo",
        },
        consultation: {
            jobPosition: metadata?.consultation.jobPosition ?? "",
            serviceDate: metadata?.consultation.serviceDate ? formatDate(metadata?.consultation.serviceDate, FORMAT_DATE) : "",
            work: {
                startDate: metadata?.consultation.work.startDate ? formatDate(metadata?.consultation.work.startDate, FORMAT_DATE) : "",
                returnDate: metadata?.consultation.work.returnDate ? formatDate(metadata?.consultation.work.returnDate, FORMAT_DATE) : "",
                lastDate: metadata?.consultation.work.lastDate ? formatDate(metadata?.consultation.work.lastDate, FORMAT_DATE) : "",
            },
            evaluationType: {
                isEntry: metadata?.consultation.evaluationType === "entry",
                isPeriodic: metadata?.consultation.evaluationType === "periodic",
                isReturn: metadata?.consultation.evaluationType === "return",
                isRetirement: metadata?.consultation.evaluationType === "retirement",
            },
            observation: metadata?.consultation.observation ?? ""
        },
        personalHistory: {
            clinicalAndSurgical: metadata?.personalHistory.clinicalAndSurgical ?? "",
            familyHistory: metadata?.personalHistory.familyHistory ?? "",
            specialConditions: {
                allowsTransfusions: metadata?.personalHistory.specialConditions.allowsTransfusions,
                hormoneTherapyAffirmative: metadata?.personalHistory.specialConditions.hormoneTherapyStatus === "yes",
                hormoneTherapyNegative: metadata?.personalHistory.specialConditions.hormoneTherapyStatus === "no",
                hormoneTherapyNoAnswer: metadata?.personalHistory.specialConditions.hormoneTherapyStatus === "do-not-answer",
                hormoneTherapyDetails: metadata?.personalHistory.specialConditions.hormoneTherapyDetails ?? ""
            },
            gynecological: mapFemoGynecological(metadata?.personalHistory, isMale),
            maleReproductive: mapFemoMaleReproductive(metadata?.personalHistory, isMale),
            lifeStyle: mapFemoLifeStyle(
                metadata?.personalHistory.toxicHabits,
                metadata?.personalHistory.lifeStyles,
                metadata?.personalHistory.preexistingConditions,
            ),
            observations: metadata?.personalHistory.observations
        },
        currentDisease: {
            description: metadata?.currentDisease.description ?? ""
        },
        vitalSigns: {
            temperature: metadata?.vitalSigns.temperature ?? "",
            bloodPressure: metadata?.vitalSigns.bloodPressure ?? "",
            heartRate: metadata?.vitalSigns.heartRate ?? "",
            respiratoryRate: metadata?.vitalSigns.respiratoryRate ?? "",
            oxygenSaturation: metadata?.vitalSigns.oxygenSaturation ?? "",
            weight: metadata?.vitalSigns.weight ?? "",
            height: metadata?.vitalSigns.height ?? "",
            bmi: metadata?.vitalSigns.bmi ?? "",
            abdominalPerimeter: metadata?.vitalSigns.abdominalPerimeter ?? "",
        },
        physicalExam: {
            region: {
                skin: {
                    scars: !!metadata?.physicalExam?.region?.skin?.scars,
                    appendages: !!metadata?.physicalExam?.region?.skin?.appendages,
                },
                eye: {
                    eyelids: !!metadata?.physicalExam?.region?.eye?.eyelids,
                    conjunctiva: !!metadata?.physicalExam?.region?.eye?.conjunctiva,
                    pupils: !!metadata?.physicalExam?.region?.eye?.pupils,
                    cornea: !!metadata?.physicalExam?.region?.eye?.cornea,
                    motility: !!metadata?.physicalExam?.region?.eye?.motility,
                },
                ear: {
                    externalAuditoryCanal: !!metadata?.physicalExam?.region?.ear?.externalAuditoryCanal,
                    auricle: !!metadata?.physicalExam?.region?.ear?.auricle,
                    eardrums: !!metadata?.physicalExam?.region?.ear?.eardrums,
                },
                oropharynx: {
                    lips: !!metadata?.physicalExam?.region?.oropharynx?.lips,
                    tongue: !!metadata?.physicalExam?.region?.oropharynx?.tongue,
                    pharynx: !!metadata?.physicalExam?.region?.oropharynx?.pharynx,
                    tonsils: !!metadata?.physicalExam?.region?.oropharynx?.tonsils,
                    teeth: !!metadata?.physicalExam?.region?.oropharynx?.teeth,
                },
                nose: {
                    septum: !!metadata?.physicalExam?.region?.nose?.septum,
                    turbinates: !!metadata?.physicalExam?.region?.nose?.turbinates,
                    mucosa: !!metadata?.physicalExam?.region?.nose?.mucosa,
                    paranasalSinuses: !!metadata?.physicalExam?.region?.nose?.paranasalSinuses,
                },
                neck: {
                    thyroid: !!metadata?.physicalExam?.region?.neck?.thyroid,
                    mobility: !!metadata?.physicalExam?.region?.neck?.mobility,
                },
                thorax: {
                    breasts: !!metadata?.physicalExam?.region?.thorax?.breasts,
                    lungs: !!metadata?.physicalExam?.region?.thorax?.lungs,
                    heart: !!metadata?.physicalExam?.region?.thorax?.heart,
                    ribCage: !!metadata?.physicalExam?.region?.thorax?.ribCage,
                },
                abdomen: {
                    viscera: !!metadata?.physicalExam?.region?.abdomen?.viscera,
                    abdominalWall: !!metadata?.physicalExam?.region?.abdomen?.abdominalWall,
                },
                spine: {
                    flexibility: !!metadata?.physicalExam?.region?.spine?.flexibility,
                    deviation: !!metadata?.physicalExam?.region?.spine?.deviation,
                    pain: !!metadata?.physicalExam?.region?.spine?.pain,
                },
                pelvis: {
                    pelvis: !!metadata?.physicalExam?.region?.pelvis?.pelvis,
                    genitals: !!metadata?.physicalExam?.region?.pelvis?.genitals,
                },
                extremities: {
                    vascular: !!metadata?.physicalExam?.region?.extremities?.vascular,
                    upperLimbs: !!metadata?.physicalExam?.region?.extremities?.upperLimbs,
                    lowerLimbs: !!metadata?.physicalExam?.region?.extremities?.lowerLimbs,
                },
                neurological: {
                    strength: !!metadata?.physicalExam?.region?.neurological?.strength,
                    sensation: !!metadata?.physicalExam?.region?.neurological?.sensation,
                    gait: !!metadata?.physicalExam?.region?.neurological?.gait,
                    reflexes: !!metadata?.physicalExam?.region?.neurological?.reflexes,
                }
            },
            regionsObservations: mapFemoRegionObservation(metadata?.physicalExam.region),
            examObservation: metadata?.physicalExam.examObservation ?? ""
        },
        riskFactors: {
            jobPosition: metadata?.consultation.jobPosition ?? "",
            activitiesRange: Array(MAX_RISK_FACTOR_LENGTH).fill(1).map((_, i) => i + 1),
            activities: mapFemoRiskFactorActivities(metadata?.riskFactors),
            sections: mapFemoRiskFactorSections(metadata?.riskFactors),
            preventiveMeasures: mapFemoRiskFactorPreventiveMeasures(metadata?.riskFactors)
        },
        employmentHistory: mapFemoEmploymentHistory(metadata?.employmentHistory),
        extraLaboralActivities: mapFemoExtraLaboralActivities(metadata?.extraLaboralActivities),
        examResults: {
            exams: mapFemoExamResults(metadata?.examResults.exams),
            observations: metadata?.examResults.observations ?? ""
        },
        diagnoses: mapFemoDiagnoses(metadata?.diagnoses),
        medicalAptitude: {
            isFit: metadata?.medicalAptitude.type === 'fit',
            isFitObservations: metadata?.medicalAptitude.type === 'fit-observation',
            isFitLimitations: metadata?.medicalAptitude.type === 'fit-limitation',
            isNotFit: metadata?.medicalAptitude.type === 'no-fit',
            observations: metadata?.medicalAptitude.observations ?? ""
        },
        recommendation: {
            description: metadata?.recommendation.description ?? ""
        },
        retirementEvaluation: {
            isPerformed: metadata?.retirementEvaluation.performed === "yes",
            isNotPerformed: metadata?.retirementEvaluation.performed === "no",
            isWorkRelated: metadata?.retirementEvaluation.workRelated === "yes",
            isNotWorkRelated: metadata?.retirementEvaluation.workRelated === "no",
            observation: metadata?.retirementEvaluation.observation ?? "",
        },
        professionalData: {
            fullName: metadata.professionalData.fullName ?? "",
            medicalCode: metadata.professionalData.medicalCode ?? ""
        }
    } satisfies TemplateFemo
}

type TemplateCertificate = {
    logo: string;
    establishment: {
        institutionName: string;
        ruc: string;
        ciiu: string;
        healthFacility: string;
        clinicalHistoryNumber: string;
        fileNumber: string;
    };

    patient: {
        firstName: string;
        middleName: string;
        lastName: string;
        secondLastName: string;
        gender: string;
        jobPosition: string;
    };

    generalData: {
        emision: {
            year: string;
            month: string;
            date: string;
        };
        evaluationType: {
            isEntry: boolean;
            isPeriodic: boolean;
            isReturn: boolean;
            isRetirement: boolean;
        };
    };

    fitness: {
        isFit: boolean;
        isFitObservation: boolean;
        isFitLimitation: boolean;
        isNoFit: boolean;
        observation: string;
    };

    recommendation: {
        observation: string;
    };

    professionalData: {
        fullName: string;
        medicalCode: string;
    };
};

export const mapMetadataToCertificate = (metadata: any): object => {
    return {
        logo: metadata.base64Logo ?? null,
        establishment: {
            institutionName: metadata?.establishment.institutionName,
            ruc: metadata?.establishment.ruc,
            ciiu: metadata?.establishment.ciiu,
            healthFacility: metadata?.establishment.healthFacility,
            clinicalHistoryNumber: metadata?.establishment.clinicalHistoryNumber,
            fileNumber: metadata?.establishment.fileNumber
        },
        patient: {
            firstName: metadata?.patient.firstName ?? "",
            middleName: metadata?.patient.middleName ?? "",
            lastName: metadata?.patient.lastName ?? "",
            secondLastName: metadata?.patient.secondLastName ?? "",
            gender: metadata?.patient.gender == "male" ? "Hombre" : "Mujer",
            jobPosition: metadata?.patient.jobPosition ?? "",
        },
        generalData: {
            emision: {
                year: getYear(new Date()).toString(),
                month: getMonth(new Date()).toString(),
                date: getDate(new Date()).toString(),
            },
            evaluationType: {
                isEntry: metadata?.generalDataEvaluation === 'entry',
                isPeriodic: metadata?.generalDataEvaluation === 'periodic',
                isReturn: metadata?.generalDataEvaluation === 'return',
                isRetirement: metadata?.generalDataEvaluation === 'retirement',
            }
        },
        fitness: {
            isFit: metadata?.fitness.type === 'fit',
            isFitObservation: metadata?.fitness.type === 'fit-observation',
            isFitLimitation: metadata?.fitness.type === 'fit-limitation',
            isNoFit: metadata?.fitness.type === 'no-fit',
            observation: metadata?.fitness.observation ?? ""
        },
        recommendation: {
            observation: metadata?.recommendation.observation ?? ""
        },
        professionalData: {
            fullName: metadata.professionalData.fullName ?? "",
            medicalCode: metadata.professionalData.medicalCode ?? ""
        }
    } satisfies TemplateCertificate
}