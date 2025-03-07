import { Attribute } from "../attribute.domain";

describe('Attribute Entity', () => {
    let attribute: Attribute;

    beforeEach(() => {
        attribute = Attribute.create({ userId: 'User1', attributeName: 'Strength', attributeValue: '10' });
    });

    it('should get the correct initial state', () => {
        expect(attribute.name).toEqual('Strength');
        expect(attribute.value).toEqual('10');
    });

    it('should update the attribute value', () => {
        attribute.addValue('15');
        expect(attribute.value).toEqual('15');
    });

    it('should rehydrate an attribute', () => {
        const attributeId = crypto.randomUUID();
        const rehydrated = Attribute.rehydrate({
            id: attributeId,
            userId: 'User1',
            name: 'Agility',
            value: '8'
        });

        expect(rehydrated.id).toEqual(attributeId);
        expect(rehydrated.name).toEqual('Agility');
        expect(rehydrated.value).toEqual('8');
    });
});
