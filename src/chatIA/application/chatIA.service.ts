import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import type { IOllamaRepository } from '../infrastructure/interfaces/ollama.repository.interface';
import { OllamaRepositoryToken } from '../infrastructure/interfaces/ollama.repository.interface';
import type { IChatIARepository } from '../infrastructure/interfaces/chatIA.repository.interface';
import { ChatIARepositoryToken } from '../infrastructure/interfaces/chatIA.repository.interface';
import { IChatIAService } from './interfaces/chatIA.service.interface';
import { IRequestPromptDto } from '../presentation/dtos/requestPromt.dto';
import { ISqlResult } from './interfaces/chatIA.interfaces';

@Injectable()
export class ChatSqlService implements IChatIAService {
  constructor(
    @Inject(OllamaRepositoryToken)
    private readonly aiProvider: IOllamaRepository,
    @Inject(ChatIARepositoryToken)
    private readonly chatIARepository: IChatIARepository,
  ) {}

  public async handlePrompt(
    userPrompt: IRequestPromptDto,
  ): Promise<ISqlResult> {
    const systemPrompt = `
    Eres un asistente que genera SQL para PostgreSQL.
    Reglas:
    1. Solo SELECT.
    2. Usa solo tablas y columnas del siguiente schema.
    3. No hagas DROP, DELETE, UPDATE ni INSERT.
    Schema:
    ${this.chatIARepository.getSchemaText()}
    Usuario pregunta: ${userPrompt.prompt}
    Devuelve solo la consulta SQL como string lista para ejecutar.
    Solo la consulta SQL. Sin explicaciones ni comentarios.
    NO uses \`\`\`sql ni \`\`\`.
    `;

    const sqlQuery = await this.aiProvider.queryOllama(systemPrompt);
    console.log('SQL generado:', sqlQuery);

    try {
      const res = await this.chatIARepository.executeQuery(sqlQuery);
      return {
        sql: sqlQuery,
        result: res,
      };
    } catch (error) {
      return {
        sql: sqlQuery,
        error: error.message,
      };
    }
  }
}
