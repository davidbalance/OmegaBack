import { Module } from "@nestjs/common";
import { ProfileModule } from "@omega/profile/profile.module";
import { PatientCreateNotifyProvider } from "./patient-create-notify.service";
import { PatientCreateNotifyToken } from "@omega/medical/nest/inject/notify.inject";

@Module({
    imports: [ProfileModule],
    providers: [PatientCreateNotifyProvider],
    exports: [PatientCreateNotifyToken]

})
export class PatientProxyModule { }