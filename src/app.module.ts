import { Module } from '@nestjs/common';
import { ChatIAModule } from './chatIA/chatIA.module';
import { ConfigModule } from '@nestjs/config';
import { ConnectionPostgrest } from './shared/config-db/db.postgrest';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ChatIAModule],
  controllers: [],
  providers: [ConnectionPostgrest],
  exports: [ConnectionPostgrest],
})
export class AppModule {}
