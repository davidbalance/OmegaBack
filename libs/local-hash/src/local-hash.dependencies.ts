import * as bcrypt from 'bcryptjs';

export const HashToken: string = "LOCAL_PATH"
export type HashType = typeof bcrypt;
export const HashValue = bcrypt;