import { Module } from '@nestjs/common';
import { ChatSqlController } from './presentation/chatIA.controller';
import { ChatSqlService } from './application/chatIA.service';
import { ConnectionPostgrest } from '../shared/config-db/db.postgrest';
import { OllamaRepository } from './infrastructure/ollama.repository';
import { OllamaRepositoryToken } from './infrastructure/interfaces/ollama.repository.interface';
import { ChatIARepositoryToken } from './infrastructure/interfaces/chatIA.repository.interface';
import { ChatIARepository } from './infrastructure/chatIA.repository';
import { ChatIAServiceToken } from './application/interfaces/chatIA.service.interface';

@Module({
  imports: [ConnectionPostgrest],
  controllers: [ChatSqlController],
  providers: [
    {
      provide: ChatIAServiceToken,
      useClass: ChatSqlService,
    },
    {
      provide: OllamaRepositoryToken,
      useClass: OllamaRepository,
    },
    {
      provide: ChatIARepositoryToken,
      useClass: ChatIARepository,
    },
  ],
})
export class ChatIAModule {}
