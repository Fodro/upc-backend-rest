import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Link } from 'src/models/link.entity';
import { config } from 'dotenv';

config();
@Module({
	imports: [
	  TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt(process.env.POSTGRES_PORT),
			database: process.env.POSTGRES_DATABASE,
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			synchronize: true,
			entities: [
				Link,
			],
	  }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
