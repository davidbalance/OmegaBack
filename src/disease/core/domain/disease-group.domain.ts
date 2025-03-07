import { Disease } from "./disease.domain";
import { AddDiseaseToGroupPayload, CreateDiseaseGroupPayload, RenameDiseaseFromGroupPayload } from "./payloads/disease-group.payloads";
import { DiseaseGroupDiseaseAddedEvent, DiseaseGroupDiseaseMovedEvent, DiseaseGroupDiseaseRemovedEvent, DiseaseGroupRemovedEvent, DiseaseGroupRenamedEvent } from "./events/disease-group.events";
import { DiseaseRenamedEvent } from "./events/disease.events";
import { Aggregate, AggregateProps } from "@shared/shared/domain/aggregate";
import { DiseaseConflictError, DiseaseNotFoundError } from "./errors/disease.errors";
import { DiseaseGroupForbiddenError } from "./errors/disease-group.errors";

export type DiseaseGroupProps = AggregateProps & {
    diseases: Disease[];
    name: string;
};
export class DiseaseGroup extends Aggregate<DiseaseGroupProps> {

    public get diseases(): ReadonlyArray<Disease> {
        return this.props.diseases;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateDiseaseGroupPayload): DiseaseGroup {
        return new DiseaseGroup({
            id: crypto.randomUUID(),
            diseases: [],
            ...value
        });
    }

    public static rehydrate(props: DiseaseGroupProps): DiseaseGroup {
        const group = new DiseaseGroup(props);
        group.commit();
        return group;
    }

    private ensureUniqueDiseaseName(name: string): void {
        if (this.props.diseases.some(x => x.name === name))
            throw new DiseaseConflictError({
                disease: name,
                groupId: this.id
            });
    }

    public rename(name: string): void {
        this.updateProps({ name });
        this.emit(new DiseaseGroupRenamedEvent({
            groupId: this.id,
            name: name
        }));
    }

    public remove(): void {
        if (this.props.diseases.length) throw new DiseaseGroupForbiddenError(this.id, 'This group have diseases attached to it.');
        this.emit(new DiseaseGroupRemovedEvent(this.id));
    }

    public addDisease(value: AddDiseaseToGroupPayload): void {
        this.ensureUniqueDiseaseName(value.diseaseName);
        const newDisease = Disease.create({
            ...value,
            name: value.diseaseName,
            groupId: this.id
        });
        this.updateProps({ diseases: [...this.props.diseases, newDisease] });
        this.emit(new DiseaseGroupDiseaseAddedEvent(newDisease));
    }

    public removeDisease(diseaseId: string): void {
        this.forceRemoveDisease(diseaseId);
        this.emit(new DiseaseGroupDiseaseRemovedEvent(diseaseId));
    }

    private forceRemoveDisease(diseaseId: string): void {
        const newDiseases = this.props.diseases.filter(x => x.id !== diseaseId);
        if (newDiseases.length === this.props.diseases.length)
            throw new DiseaseNotFoundError(diseaseId);

        this.updateProps({ diseases: newDiseases });
    }

    public moveDiseaseTo(target: DiseaseGroup, diseaseId: string): void {
        const diseaseToMove = this.props.diseases.find(e => e.id === diseaseId);
        if (!diseaseToMove)
            throw new DiseaseNotFoundError(diseaseId);

        target.ensureUniqueDiseaseName(diseaseToMove.name);

        this.forceRemoveDisease(diseaseId);
        target.updateProps({ diseases: [...target.diseases, diseaseToMove] });
        this.emit(new DiseaseGroupDiseaseMovedEvent({
            targetId: target.id,
            diseaseId: diseaseId
        }));
    }

    public renameDiseaseInGroup(value: RenameDiseaseFromGroupPayload): void {
        const diseaseIndex = this.props.diseases.findIndex(x => x.id === value.diseaseId);
        if (diseaseIndex < 0)
            throw new DiseaseNotFoundError(value.diseaseId);

        const newDiseases = [...this.props.diseases];
        newDiseases[diseaseIndex].rename(value.diseaseName);

        this.updateProps({ diseases: newDiseases });
        this.emit(new DiseaseRenamedEvent(value));
    }
}