import archiver from "archiver";

export type NestArchiverDelegate = typeof archiver;
export type NestArchiver = archiver.Archiver;