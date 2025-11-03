export interface IOllamaRepository {
  queryOllama(prompt: string): Promise<string>;
}

export const OllamaRepositoryToken = Symbol('OllamaRepositoryToken');
