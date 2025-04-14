import * as fs from 'fs'

export const FileToken: string = "LOCAL_FILE"
export type FileType = typeof fs;
export const FileValue = fs;