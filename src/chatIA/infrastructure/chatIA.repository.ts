import { Pool, PoolClient } from 'pg';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import environment from 'src/shared/enviroments';
import { IChatIARepository } from './interfaces/chatIA.repository.interface';

@Injectable()
export class ChatIARepository implements OnModuleDestroy, IChatIARepository {
  private pool: Pool;

  constructor() {
    this.initializePool();
  }

  private initializePool(): void {
    this.pool = new Pool({
      user: environment.db.user,
      host: environment.db.host,
      database: environment.db.database,
      password: environment.db.password,
      port: environment.db.port,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  public async executeQuery<T = any>(
    query: string,
    params?: any[],
  ): Promise<T[]> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();
      const result = await client.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  public async onModuleDestroy(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      console.log('Database pool closed');
    }
  }

  public getSchemaText(): string {
    return `
          Tablas disponibles:
          - usuarios(id, nombre, email, activo)
          - cursos(id, nombre, docente_id)
          - pagos(id, usuario_id, curso_id, monto, fecha)
          Relaciones:
          - pagos.usuario_id → usuarios.id
          - pagos.curso_id → cursos.id
          `;
  }
}
