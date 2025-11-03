export interface IChatIARepository {
  getSchemaText(): string;
  executeQuery<T = any>(query: string, params?: any[]): Promise<T[]>;
}

export const ChatIARepositoryToken = Symbol('ChatIARepositoryToken');
