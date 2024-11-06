import { Module } from "@nestjs/common";
import { NEST_NODEMAILER } from "./inject-token";
import nodemailer from 'nodemailer';

@Module({
    providers: [{
        provide: NEST_NODEMAILER,
        useValue: nodemailer
    }],
    exports: [NEST_NODEMAILER]
})
export class NodemailerModule { }