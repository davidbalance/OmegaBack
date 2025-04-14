import { Area } from "../area.domain";
import { AreaRenamedEvent } from "../events/area.event";

describe('Area Entity', () => {
    let area: Area;

    beforeEach(() => {
        area = Area.create({ name: 'Test Area' });
    });

    it('should get the correct initial state', () => {
        expect(area.name).toEqual('Test Area');
    });

    it('should rehydrate', () => {
        const areaId = crypto.randomUUID();
        const rehydrated = Area.rehydrate({
            id: areaId,
            name: 'Test Area'
        });

        expect(rehydrated.id).toEqual(areaId);
        expect(rehydrated.name).toEqual('Test Area');
    });
    
    it('should rename the area', () => {
        area.rename('New Area');
        expect(area.name).toEqual('New Area');
    });

    it('should emit AreaRenamedEvent when renamed', () => {
        const spy = jest.spyOn(area as any, 'emit');
        area.rename('Renamed Area');
        expect(spy).toHaveBeenCalledWith(new AreaRenamedEvent({
            areaId: area.id,
            areaName: 'Renamed Area'
        }));
    });
});
