export interface PasswordProvider {
    hash(value: string): string;
    compare(actual: string, hash: string): boolean;
}