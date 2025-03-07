import { DomainEvent } from "@shared/shared/domain";

const DiseaseEventKeys = {
    Renamed: "disease.renamed",
}

export class DiseaseIsEvent {
    public static isDiseaseRenamedEvent(event: DomainEvent<unknown>): event is DiseaseRenamedEvent {
        return event.key === DiseaseEventKeys.Renamed;
    }
}

export type DiseaseRenamedEventPayload = {
    diseaseId: string;
    diseaseName: string;
}
export class DiseaseRenamedEvent extends DomainEvent<DiseaseRenamedEventPayload> {
    constructor(value: DiseaseRenamedEventPayload) {
        super({ key: DiseaseEventKeys.Renamed, value });
    }
}