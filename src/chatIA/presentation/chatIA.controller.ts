import { Controller, Post, Body, Inject } from '@nestjs/common';
import type { IChatIAService } from '../application/interfaces/chatIA.service.interface';
import { ChatIAServiceToken } from '../application/interfaces/chatIA.service.interface';
import { IRequestPromptDto, RequestPromptDto } from './dtos/requestPromt.dto';
import { ApiResponse } from 'src/shared/response/api.response';

@Controller('chat-sql')
export class ChatSqlController {
  constructor(
    @Inject(ChatIAServiceToken)
    private readonly chatSqlService: IChatIAService,
  ) {}

  @Post()
  public async chat(@Body() body: RequestPromptDto) {
    const result = await this.chatSqlService.handlePrompt(body);
    return new ApiResponse(result, 'Consulta procesada correctamente', 200);
  }
}
