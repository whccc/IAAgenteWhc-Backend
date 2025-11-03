import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IOllamaRepository } from './interfaces/ollama.repository.interface';

@Injectable()
export class OllamaRepository implements IOllamaRepository {
  private readonly ollamaUrl = 'http://localhost:11434';

  public async queryOllama(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma3',
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new HttpException(
          `Ollama API error: ${response.statusText}`,
          HttpStatus.BAD_GATEWAY,
        );
      }
      const data = await response.json();

      const rawResponse = data.response || '';
      const cleanSQL = this.extractSQL(rawResponse);

      return cleanSQL;
    } catch (error) {
      console.error('Error calling Ollama API:', error);
      throw new HttpException(
        'Failed to get response from Ollama',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private extractSQL(response: string): string {
    let cleanSQL = response
      .replace(/```sql\s*\n?/gi, '')
      .replace(/```\s*$/g, '');
    cleanSQL = cleanSQL.replace(/```\s*\n?/g, '').replace(/```\s*$/g, '');

    cleanSQL = cleanSQL.trim();

    if (!cleanSQL || cleanSQL.length === 0) {
      return response.trim();
    }

    return cleanSQL;
  }
}
