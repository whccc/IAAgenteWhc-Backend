import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { IOllamaRepository } from './interfaces/ollama.repository.interface';

@Injectable()
export class OllamaRepository implements IOllamaRepository {
  public async queryOllama(prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const proc = spawn('ollama', ['generate', 'llama2', '--prompt', prompt]);

      let output = '';
      proc.stdout.on('data', (data) => (output += data.toString()));
      proc.stderr.on('data', (err) => console.error(err.toString()));
      proc.on('close', (code) => {
        if (code === 0) resolve(output.trim());
        else reject(`Ollama exited with ${code}`);
      });
    });
  }
}
