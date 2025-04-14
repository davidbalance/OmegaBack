import { DiseaseGroup } from "../disease-group.domain";
import { DiseaseGroupForbiddenError } from "../errors/disease-group.errors";
import { DiseaseConflictError, DiseaseNotFoundError } from "../errors/disease.errors";

describe('DiseaseGroup Aggregate', () => {
    let diseaseGroup: DiseaseGroup;

    beforeEach(() => {
        diseaseGroup = DiseaseGroup.create({ name: 'Viral Infections' });
    });

    it('should get the correct initial state', () => {
        expect(diseaseGroup.name).toEqual('Viral Infections');
        expect(diseaseGroup.diseases).toEqual([]);
    });

    it('should rehydrate a DiseaseGroup', () => {
        const diseaseGroupId = crypto.randomUUID();
        const rehydrated = DiseaseGroup.rehydrate({
            id: diseaseGroupId,
            name: 'Respiratory Diseases',
            diseases: []
        });

        expect(rehydrated.id).toEqual(diseaseGroupId);
        expect(rehydrated.name).toEqual('Respiratory Diseases');
        expect(rehydrated.diseases.length).toEqual(0);
    });

    it('should rename the disease group', () => {
        diseaseGroup.rename('Bacterial Infections');
        expect(diseaseGroup.name).toEqual('Bacterial Infections');
    });

    it('should throw an error when removing and have diseases', () => {
        diseaseGroup.addDisease({ diseaseName: 'Flu' });
        expect(() => diseaseGroup.remove()).toThrow(DiseaseGroupForbiddenError);
    });

    it('should add a disease to the group', () => {
        diseaseGroup.addDisease({ diseaseName: 'Flu' });

        expect(diseaseGroup.diseases.length).toEqual(1);
        expect(diseaseGroup.diseases[0].name).toEqual('Flu');
    });

    it('should not allow duplicate disease names', () => {
        diseaseGroup.addDisease({ diseaseName: 'Flu' });

        expect(() => diseaseGroup.addDisease({ diseaseName: 'Flu' }))
            .toThrow(DiseaseConflictError);
    });

    it('should remove a disease from the group', () => {
        diseaseGroup.addDisease({ diseaseName: 'Flu' });
        const diseaseId = diseaseGroup.diseases[0].id;

        diseaseGroup.removeDisease(diseaseId);

        expect(diseaseGroup.diseases.length).toEqual(0);
    });

    it('should throw an error when removing a non-existent disease', () => {
        expect(() => diseaseGroup.removeDisease('non-existent-id'))
            .toThrow(DiseaseNotFoundError);
    });

    it('should move a disease to another group', () => {
        const targetGroup = DiseaseGroup.create({ name: 'Bacterial Infections' });
        diseaseGroup.addDisease({ diseaseName: 'Flu' });
        const diseaseId = diseaseGroup.diseases[0].id;

        diseaseGroup.moveDiseaseTo(targetGroup, diseaseId);

        expect(diseaseGroup.diseases.length).toEqual(0);
        expect(targetGroup.diseases.length).toEqual(1);
        expect(targetGroup.diseases[0].name).toEqual('Flu');
    });

    it('should throw an error when moving a non-existent disease', () => {
        const targetGroup = DiseaseGroup.create({ name: 'Bacterial Infections' });

        expect(() => diseaseGroup.moveDiseaseTo(targetGroup, 'non-existent-id'))
            .toThrow(DiseaseNotFoundError);
    });

    it('should rename a disease within the group', () => {
        diseaseGroup.addDisease({ diseaseName: 'Flu' });
        const diseaseId = diseaseGroup.diseases[0].id;

        diseaseGroup.renameDiseaseInGroup({ diseaseId, diseaseName: 'Influenza' });

        expect(diseaseGroup.diseases[0].name).toEqual('Influenza');
    });
});
