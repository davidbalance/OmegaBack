import { ReportContent } from "@omega/medical/application/queries/test/report-get-file.query";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { reportLayoutLoader } from "../report-layout-loader.factory";

describe('reportLayoutLoader', () => {
    const mockData: ReportContent = {
        patientFullname: 'John Doe',
        patientAge: 30,
        reportEmissionDate: new Date('2023-01-01T12:00:00Z'),
        locationCompanyName: 'Health Clinic',
        patientDni: '12345678',
        examName: 'Blood Test',
        doctorFullname: 'Alice Smith',
        doctorDni: '87654321',
        doctorSignature: 'base64signature==',
        reportContent: 'This is my test content',
        reportFilepath: '/file/path'
    };

    const mockHeaderImage = 'base64headerimage==';
    const mockBodyContent: Content = { text: 'Main content here' };

    it('should return a valid document definition', () => {
        const result: TDocumentDefinitions = reportLayoutLoader(mockData, mockHeaderImage, mockBodyContent);

        expect(result.pageSize).toBe('A4');
        expect(result.pageMargins).toEqual([30, 200]);
        expect(result.content).toEqual({ stack: [mockBodyContent] });

        // Header structure
        expect(result.header).toBeInstanceOf(Array);
        expect(result.header?.[0]).toMatchObject({
            image: mockHeaderImage,
            fit: [595, 100],
            alignment: 'center',
            margin: [0, 0, 0, 10]
        });

        const patientTextBlock = result.header?.[1].columns[0].stack[0].text;
        expect(patientTextBlock[0]).toEqual({ text: 'PACIENTE: ', style: 'fieldTitle' });
        expect(patientTextBlock[1]).toEqual({ text: mockData.patientFullname, style: 'fieldText' });

        const cedulaBlock = result.header?.[1].columns[1].stack[0].text;
        expect(cedulaBlock[0]).toEqual({ text: 'CEDULA: ', style: 'fieldTitle' });
        expect(cedulaBlock[1]).toEqual({ text: mockData.patientDni, style: 'fieldText' });

        // Footer
        expect((result as any).footer?.columns[0].stack[0]).toEqual({
            text: `Dr/a.${mockData.doctorFullname}`,
            style: 'doctor'
        });

        expect((result as any).footer?.columns[1].image).toBe(mockData.doctorSignature);

        // Page break logic
        expect((result as any).pageBreakBefore?.({ text: [{ nodeName: 'BR' }] } as any)).toBe(true);
        expect((result as any).pageBreakBefore?.({ text: [{ nodeName: 'DIV' }] } as any)).toBe(false);

        // Style checks
        expect(result.styles?.field).toEqual({ margin: [30, 2] });
        expect(result.styles?.fieldTitle?.bold).toBe(true);
    });
});