import { Disease } from "../disease.domain";

describe('Disease Entity', () => {
    let disease: Disease;

    beforeEach(() => {
        disease = Disease.create({ groupId: 'Group1', name: 'Flu' });
    });

    it('should get the correct initial state', () => {
        expect(disease.groupId).toEqual('Group1');
        expect(disease.name).toEqual('Flu');
    });

    it('should rehydrate the entity', () => {
        const value = Disease.rehydrate({
            id: 'valid-disease-id',
            name: "Flu",
            groupId: 'valid-group-id',
        })

        expect(value.id).toEqual('valid-disease-id');
        expect(value.name).toEqual('Flu');
        expect(value.groupId).toEqual('valid-group-id');
    });
    
    it('should rename the disease', () => {
        disease.rename('Influenza');
        expect(disease.name).toEqual('Influenza');
    });
});
