import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { checklistLayoutLoader } from "../checklist-layout-loader.factory";
import { TDocumentDefinitions } from "pdfmake/interfaces";

describe('checklistLayoutLoader', () => {
    const mockImage = 'data:image/png;base64,mockimage==';

    const baseMockOrder: OrderChecklistModel = {
        locationJobPosition: 'Developer',
        locationCompanyName: 'TestCorp',
        locationCompanyRuc: '1234567890',
        orderProcess: 'Ingreso',
        patientName: 'John',
        patientLastname: 'Doe',
        patientDni: '12345678',
        examName: 'Examen A',
        testCheck: false,
    } as unknown as OrderChecklistModel;

    it('should throw an error if data array is empty', () => {
        expect(() => checklistLayoutLoader([], mockImage)).toThrow('Failer to retrive order.');
    });

    it('should return a valid TDocumentDefinitions object with required sections', () => {
        const layout: TDocumentDefinitions = checklistLayoutLoader([baseMockOrder], mockImage);

        expect(layout.pageSize).toBe('A4');
        expect(layout.pageMargins).toEqual([30, 75, 30, 125]);

        expect(layout.header).toBeDefined();
        expect(Array.isArray(layout.header)).toBe(true);

        expect(layout.content).toBeDefined();
        expect(Array.isArray(layout.content)).toBe(true);

        expect(layout.footer).toBeDefined();
        expect(Array.isArray(layout.footer)).toBe(true);
    });

    it('should include exam entries in the checklist', () => {
        const data: OrderChecklistModel[] = [
            baseMockOrder,
            { ...baseMockOrder, examName: 'Examen B', testCheck: false },
            { ...baseMockOrder, examName: 'Examen C', testCheck: true }, // should be excluded
        ] as unknown as OrderChecklistModel[];

        const layout = checklistLayoutLoader(data, mockImage);
        const checklistTable = layout.content?.[2]?.table?.body ?? [];

        const examTexts = checklistTable
            .flat()
            .map(cell => cell?.text)
            .filter(Boolean);

        expect(examTexts).toContain('Examen A');
        expect(examTexts).toContain('Examen B');
        expect(examTexts).not.toContain('Examen C');
    });
});