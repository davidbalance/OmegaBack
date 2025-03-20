import { Inject } from "@nestjs/common";

export const ClientAreaModelRepositoryToken = 'ClientAreaModelRepository';
export const ClientDoctorModelRepositoryToken = 'ClientDoctorModelRepository';
export const ClientEmailModelRepositoryToken = 'ClientEmailModelRepository';
export const ClientJobPositionModelRepositoryToken = 'ClientJobPositionModelRepository';
export const ClientManagementModelRepositoryToken = 'ClientManagementModelRepository';
export const ClientRecordModelRepositoryToken = 'ClientRecordModelRepository';
export const ClientModelRepositoryToken = 'ClientModelRepository';
export const OrderChecklistModelRepositoryToken = 'OrderChecklistModelRepository';
export const OrderCloudFileModelRepositoryToken = 'OrderCloudFileModelRepository';
export const OrderDoctorModelRepositoryToken = 'OrderDoctorModelRepository';
export const OrderPatientModelRepositoryToken = 'OrderPatientModelRepository';
export const OrderProcessModelRepositoryToken = 'OrderProcessModelRepository';
export const OrderYearModelRepositoryToken = 'OrderYearModelRepository';
export const OrderModelRepositoryToken = 'OrderModelRepository';
export const DiseaseReportModelRepositoryToken = 'DiseaseReportModelRepository';
export const ReportModelRepositoryToken = 'ReportModelRepository';
export const ResultFilepathModelRepositoryToken = 'ResultFilepathModelRepository';
export const TestDoctorModelRepositoryToken = 'TestDoctorModelRepository';
export const TestReportModelRepositoryToken = 'TestReportModelRepository';
export const TestModelRepositoryToken = 'TestModelRepository';
export const TestInnerModelRepositoryToken = 'TestInnerModelRepository';
export const TestFileResultRepositoryToken = 'TestFileResultModelRepository';

const repository = {
    ClientArea: ClientAreaModelRepositoryToken,
    ClientDoctor: ClientDoctorModelRepositoryToken,
    ClientEmail: ClientEmailModelRepositoryToken,
    ClientJobPosition: ClientJobPositionModelRepositoryToken,
    ClientManagement: ClientManagementModelRepositoryToken,
    ClientRecord: ClientRecordModelRepositoryToken,
    Client: ClientModelRepositoryToken,
    OrderChecklist: OrderChecklistModelRepositoryToken,
    OrderCloudFile: OrderCloudFileModelRepositoryToken,
    OrderDoctor: OrderDoctorModelRepositoryToken,
    OrderPatient: OrderPatientModelRepositoryToken,
    OrderProcess: OrderProcessModelRepositoryToken,
    OrderYear: OrderYearModelRepositoryToken,
    Order: OrderModelRepositoryToken,
    DiseaseReport: DiseaseReportModelRepositoryToken,
    Report: ReportModelRepositoryToken,
    ResultFilepath: ResultFilepathModelRepositoryToken,
    TestDoctor: TestDoctorModelRepositoryToken,
    TestReport: TestReportModelRepositoryToken,
    Test: TestModelRepositoryToken,
    TestInner: TestInnerModelRepositoryToken,
    TestFileResult: TestFileResultRepositoryToken,
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);