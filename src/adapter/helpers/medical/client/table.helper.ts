type HorizontalContent = {
    text: string;
    fontSize?: number;
}
type HorizontalContentOption = Pick<HorizontalContent, 'fontSize'>
const createHorizontalContent = (text: string, options: HorizontalContentOption): HorizontalContent => ({ ...options, text });


type VerticalContent = {
    svg: string;
}
type VerticalContentOption = {
    fontSize: number;
    height: number;
    width: number;
}
const defaultVerticalContentOption: VerticalContentOption = {
    height: 100,
    width: 10,
    fontSize: 8
}
const createVerticalContent = (text: string, options: Partial<VerticalContentOption>): VerticalContent => {
    const { fontSize, height, width }: VerticalContentOption = { ...defaultVerticalContentOption, ...options };
    const xPos = 6;
    const yPos = height - 1;

    return {
        svg: `<svg width="${width}" height="${height}">
              <text x="${xPos}" y="${yPos}" transform="rotate(-90, ${xPos}, ${yPos})" font-size="${fontSize}">
                ${text}
              </text>
            </svg>`,
    };
}

type HorizontalCellContent = Omit<HorizontalContent, 'text'> & { orientation: 'horizontal', alignment?: 'center' | 'left' | 'right' };
type VerticalCellContent = Omit<VerticalContent, 'svg'> & { orientation: 'vertical' }
type CellContent = {
    text?: string;
    svg?: string;
    colSpan: number;
    rowSpan: number;
    style?: string;
    border: boolean[];
}
export type Cell = CellContent & (VerticalCellContent | HorizontalCellContent);

type CellOption = Pick<CellContent, 'colSpan' | 'rowSpan' | 'style'> & {
    border: ('left' | 'right' | 'top' | 'bottom')[];
}
type HorizontalCellOption = { orientation: 'horizontal' } & CellOption & Partial<HorizontalContentOption>;
type VerticalCellOption = { orientation: 'vertical' } & CellOption & Partial<VerticalContentOption>;
type StrictCellOption = HorizontalCellOption | VerticalCellOption;

const defaultCellOptions: StrictCellOption = {
    orientation: 'horizontal',
    colSpan: 1,
    rowSpan: 1,
    border: ['left', 'right', 'top', 'bottom'],
}
export const craftCell = (value: string, options: Partial<StrictCellOption> = {}): Cell => {
    const initialOptions: StrictCellOption = { ...defaultCellOptions, ...options };
    const border = Array.from(new Set(initialOptions.border))
        .reduce((prev, curr) => ({ ...prev, [curr]: true }), { left: false, top: false, right: false, bottom: false });

    const content = initialOptions.orientation === 'vertical' ? createVerticalContent(value, initialOptions) : createHorizontalContent(value, initialOptions)

    return {
        ...initialOptions,
        ...content,
        border: [border.left, border.top, border.right, border.bottom]
    }
}

type SpacingOptions = Pick<StrictCellOption, 'colSpan' | 'rowSpan'>;
const defaultSpacingOptions: SpacingOptions = {
    colSpan: 1,
    rowSpan: 1
}
export const craftSpacing = (options: Partial<SpacingOptions> = {}): Cell => craftCell(' ', { ...defaultSpacingOptions, ...options, border: [] });

type CraftTitleOption = Omit<StrictCellOption, 'border' | 'style' | 'orientation'>
const defaultTitleOption: CraftTitleOption = { colSpan: 1, rowSpan: 1 }
export const craftTitle = (text: string, option: Partial<CraftTitleOption> = {}): Cell => craftCell(text, { ...defaultTitleOption, ...option, style: 'itemTitle' });

type CraftSubtitleOption = Omit<StrictCellOption, 'border' | 'style' | 'orientation'>
const defaultSubtitleOption: CraftSubtitleOption = { colSpan: 1, rowSpan: 1 }
export const craftSubtitle = (text: string, option: Partial<CraftSubtitleOption> = {}): Cell => craftCell(text, { ...defaultSubtitleOption, ...option, style: 'itemSubtitle' });

type EmptyCellOptions = Pick<CellOption, 'border' | 'colSpan'>
export const emptyCell = (options: Partial<EmptyCellOptions> = {}): Cell => craftCell('', options);

export type RowSpan = { vertical: number, horizontal: number };
export type Row = (length: number, span?: RowSpan[]) => { row: Cell[], nextSpan: RowSpan[]; };
export const craftRow = (...cells: Cell[]): Row =>
    (length, span) => {
        if (cells.length > length) throw new Error("More columns greater than expected");

        if (!span) {
            span = Array.from<RowSpan>({ length: length }).fill({ horizontal: 0, vertical: 0 });
        } else if (span.length !== length) {
            throw new Error('Cannot span rows');
        }

        const spanColumns = cells.reduce((prev, curr) => prev + curr.colSpan, 0) + span.reduce((prev, curr) => prev + curr.horizontal, 0);
        if (spanColumns > length) throw new Error('More columns spanned than expected');
        if (spanColumns < length) cells.push(...Array.from<Cell>({ length: length - cells.length }).fill(emptyCell()))

        const row: Cell[] = [];

        for (let i = 0; i < length; i++) {
            const spanColumn = span[i];
            if (spanColumn.vertical !== 0) {
                row.push(emptyCell({ colSpan: spanColumn.horizontal }));
                i += spanColumn.horizontal - 1;
            } else {
                const value = cells.shift();
                if (!value) continue;
                row.push(value);
                if (value.rowSpan > 1) {
                    span[i] = { horizontal: value.colSpan, vertical: value.rowSpan }
                }
                i += value.colSpan - 1;
            }
        }

        return {
            row: row.map(e => e.colSpan > 1 ? [e, ...(Array.from({ length: e.colSpan - 1 }).fill({}) as Cell[])] : [e]).reduce((prev, curr) => [...prev, ...curr], []),
            nextSpan: span.map(e => e.vertical > 1 ? ({ ...e, vertical: e.vertical - 1 }) : { vertical: 0, horizontal: 0 })
        }
    }
export const craftHeader = (text: string): Row => (length) => ({
    row: [craftCell(text, { colSpan: length, style: 'tableHeader' }), ...Array.from<Cell>({ length: length - 1 }).fill(emptyCell({}))],
    nextSpan: Array.from<RowSpan>({ length }).fill({ horizontal: 0, vertical: 0 })
});

export const craftTable = (columns: number, size: number, ...values: Row[]): object => {

    let nextSpan: RowSpan[] = Array.from<RowSpan>({ length: columns }).fill({ horizontal: 0, vertical: 0 });
    const content = values.map(e => {
        const row = e(columns, nextSpan);
        nextSpan = row.nextSpan;
        return row.row;
    });

    while (nextSpan.some(e => e.vertical > 0)) {
        const newRow: Cell[] = [];
        for (let i = 0; i < columns; i++) {
            const spanColumn = nextSpan[i];
            if (spanColumn.vertical !== 0) {
                newRow.push(emptyCell({ colSpan: spanColumn.horizontal }), ...(Array.from<Cell>({ length: spanColumn.horizontal - 1 }).fill(emptyCell({}))));
                i += spanColumn.horizontal - 1;
            } else {
                newRow.push(emptyCell({}));
            }
        }
        content.push(newRow);
        nextSpan = nextSpan.map(e => e.vertical > 0 ? ({ ...e, vertical: e.vertical - 1 }) : { vertical: 0, horizontal: 0 })
    }

    return {
        width: '*',
        table: {
            widths: Array.from({ length: columns }).fill(size),
            body: content
        },
        layout: {
            paddingLeft: () => 1,
            paddingRight: () => 1,
            paddingTop: () => 2,
            paddingBottom: () => 2,
            hLineWidth: () => 0.1,
            vLineWidth: () => 0.1,
        }
    }
};