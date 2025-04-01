import { Inject } from "@nestjs/common";

export const ClientAreaFindOneQueryToken = 'ClientAreaFindOneQuery';
export const ClientDoctorFindManyQueryToken = 'ClientDoctorFindManyQuery';
export const ClientEmailFindManyQueryToken = 'ClientEmailFindManyQuery';
export const ClientFindManyByCompanyRucQueryToken = 'ClientFindManyByCompanyRucQuery';
export const ClientFindManyQueryToken = 'ClientFindManyQuery';
export const ClientFindMassiveLoadTemplateQueryToken = 'ClientFindMassiveLoadTemplateQuery';
export const ClientFindOneByDniQueryToken = 'ClientFindOneByDniQuery';
export const ClientFindOneQueryToken = 'ClientFindOneQuery';
export const ClientJobPositionFindOneQueryToken = 'ClientJobPositionFindOneQuery';
export const ClientRecordFindManyQueryToken = 'ClientRecordFindManyQuery';
export const ClientRecordFindOneQueryToken = 'ClientRecordFindOneQuery';
export const ClientManagementFindOneQueryToken = 'ClientManagementFindOneQuery';
export const OrderChecklistFindManyQueryToken = 'OrderChecklistFindManyQuery';
export const OrderChecklistGetFileQueryToken = 'OrderChecklistGetFileQuery';
export const OrderCloudFindManyQueryToken = 'OrderCloudFindManyQuery';
export const OrderDoctorFindManyQueryToken = 'OrderDoctorFindManyQuery';
export const OrderFindMassiveLoadTemplateQueryToken = 'OrderFindMassiveLoadTemplateQuery';
export const OrderPatientFindManyQueryToken = 'OrderPatientFindManyQuery';
export const OrderProcessFindManyQueryToken = 'OrderProcessFindManyQuery';
export const OrderFindOneQueryToken = 'OrderFindOneQuery';
export const OrderYearFindManyQueryToken = 'OrderYearFindManyQuery';
export const OrderFindManyQueryToken = 'OrderFindManyQuery';
export const OrderFindOneByExternalKeyQueryToken = 'OrderFindOneByExternalKeyQuery';
export const DiseaseReportFindManyQueryToken = 'DiseaseReportFindManyQuery';
export const DiseaseReportFindOneQueryToken = 'DiseaseReportFindOneQuery';
export const ReportFindOneQueryToken = 'ReportFindOneQuery';
export const ReportGetFileQueryToken = 'ReportGetFileQuery';
export const ResultGetFileQueryToken = 'ResultGetFileQuery';
export const ResultGetFilepathQueryToken = 'ResultGetFilepathQuery';
export const TestGetZipQueryToken = 'TestGetZipQuery';
export const TestFindManyQueryToken = 'TestFindManyQuery';
export const TestFindOneQueryToken = 'TestFindOneQuery';
export const TestFindOneByExternalKeyQueryToken = 'TestFindOneByExternalKeyQuery';
export const TestReportGetFileQueryToken = 'TestReportGetFileQuery';
export const TestFileResultReportQueryToken = 'TestFileResultReportQuery';
export const TestFileResultCountQueryToken = 'TestFileResultCountQuery';

const query = {
    ClientAreaFindOne: ClientAreaFindOneQueryToken,
    ClientDoctorFindMany: ClientDoctorFindManyQueryToken,
    ClientEmailFindMany: ClientEmailFindManyQueryToken,
    ClientFindManyByCompany: ClientFindManyByCompanyRucQueryToken,
    ClientFindMany: ClientFindManyQueryToken,
    ClientFindMassiveLoadTemplate: ClientFindMassiveLoadTemplateQueryToken,
    ClientFindOneByDni: ClientFindOneByDniQueryToken,
    ClientFindOne: ClientFindOneQueryToken,
    ClientJobPositionFindOne: ClientJobPositionFindOneQueryToken,
    ClientRecordFindMany: ClientRecordFindManyQueryToken,
    ClientRecordFindOne: ClientRecordFindOneQueryToken,
    ClientManagementFindOne: ClientManagementFindOneQueryToken,
    OrderChecklistFindMany: OrderChecklistFindManyQueryToken,
    OrderChecklistGetFile: OrderChecklistGetFileQueryToken,
    OrderCloudFindMany: OrderCloudFindManyQueryToken,
    OrderDoctorFindMany: OrderDoctorFindManyQueryToken,
    OrderFindMassiveLoadTemplate: OrderFindMassiveLoadTemplateQueryToken,
    OrderPatientFindMany: OrderPatientFindManyQueryToken,
    OrderProcessFindMany: OrderProcessFindManyQueryToken,
    OrderFindOne: OrderFindOneQueryToken,
    OrderYearFindMany: OrderYearFindManyQueryToken,
    OrderFindMany: OrderFindManyQueryToken,
    OrderFindOneByExternalKey: OrderFindOneByExternalKeyQueryToken,
    DiseaseReportFindMany: DiseaseReportFindManyQueryToken,
    DiseaseReportFindOne: DiseaseReportFindOneQueryToken,
    ReportFindOne: ReportFindOneQueryToken,
    ReportGetFile: ReportGetFileQueryToken,
    ResultGetFile: ResultGetFileQueryToken,
    ResultGetFilepath: ResultGetFilepathQueryToken,
    TestGetZipQuery: TestGetZipQueryToken,
    TestFindOne: TestFindOneQueryToken,
    TestFindMany: TestFindManyQueryToken,
    TestFindOneByExternalKey: TestFindOneByExternalKeyQueryToken,
    TestReportGetFile: TestReportGetFileQueryToken,
    TestFileResultReport: TestFileResultReportQueryToken,
    TestFileResultCount: TestFileResultCountQueryToken,
}

export const InjectQuery = (token: keyof typeof query) => Inject(query[token]);