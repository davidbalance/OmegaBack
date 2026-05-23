import { craftCell, craftHeader, craftRow, craftSpacing, craftSubtitle, craftTable, craftTitle, emptyCell } from "../table.helper";

describe('PDF Table Helpers', () => {
    describe('craftCell', () => {
        it('creates a default horizontal cell', () => {
            const cell = craftCell('Test');
            expect(cell.text).toBe('Test');
            expect(cell.svg).toBeUndefined();
            expect(cell.border).toEqual([true, true, true, true]);
        });

        it('creates a vertical cell with SVG content', () => {
            const cell = craftCell('Vertical', { orientation: 'vertical' });
            expect(cell.svg).toContain('<svg');
            expect(cell.text).toBeUndefined();
        });

        it('applies border correctly', () => {
            const cell = craftCell('Bordered', { border: ['left', 'top'] });
            expect(cell.border).toEqual([true, true, false, false]);
        });
    });

    describe('craftSpacing', () => {
        it('creates a blank spacing cell with no border', () => {
            const cell = craftSpacing();
            expect(cell.text).toBe(' ');
            expect(cell.border).toEqual([false, false, false, false]);
        });
    });

    describe('craftTitle', () => {
        it('sets correct style for title', () => {
            const title = craftTitle('Section Title');
            expect(title.style).toBe('itemTitle');
        });
    });

    describe('craftSubtitle', () => {
        it('sets correct style for subtitle', () => {
            const subtitle = craftSubtitle('Section Subtitle');
            expect(subtitle.style).toBe('itemSubtitle');
        });
    });

    describe('emptyCell', () => {
        it('creates an empty cell with no text', () => {
            const cell = emptyCell({ border: ['bottom'] });
            expect(cell.text).toBe('');
            expect(cell.border).toEqual([false, false, false, true]);
        });
    });

    describe('craftRow', () => {
        it('creates a row and handles vertical span', () => {
            const rowFn = craftRow(
                craftCell('A', { rowSpan: 2 }),
                craftCell('B')
            );

            const firstRow = rowFn(3);
            expect(firstRow.row.length).toBe(3);
            expect(firstRow.row[0].text).toBe('A');
            expect(firstRow.nextSpan[0].vertical).toBe(1);

            const secondRow = rowFn(3, firstRow.nextSpan);
            expect(secondRow.row[0].text).toBe('');
        });

        it('throws error when cells exceed column count', () => {
            const makeRow = craftRow(
                craftCell('X'),
                craftCell('Y')
            );
            expect(() => makeRow(1)).toThrow(Error);
        });
    });

    describe('craftHeader', () => {
        it('generates a full-width header with style', () => {
            const { row } = craftHeader('My Header')(4);
            expect(row[0].colSpan).toBe(4);
            expect(row[0].style).toBe('tableHeader');
        });
    });

    describe('craftTable', () => {
        it('generates a full table and fills span rows', () => {
            const table = craftTable(3, 20,
                craftRow(
                    craftCell('A', { rowSpan: 2 }),
                    craftCell('B'),
                    craftCell('C')
                )
            );
            const body = (table as any).table.body;
            expect(body.length).toBeGreaterThan(1);
        });
    });
});