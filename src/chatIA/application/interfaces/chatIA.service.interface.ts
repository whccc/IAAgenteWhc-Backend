import { IRequestPromptDto } from 'src/chatIA/presentation/dtos/requestPromt.dto';
import { ISqlResult } from './chatIA.interfaces';

export interface IChatIAService {
  handlePrompt(userPrompt: IRequestPromptDto): Promise<ISqlResult>;
}

export const ChatIAServiceToken = Symbol('ChatIAServiceToken');
