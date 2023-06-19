import { join } from "path"
import {ConfigService} from "@nestjs/config";
import {DataSource} from "typeorm";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";
import { config } from 'dotenv'
import {DIR_NAME} from "../../../../root_directory";
import {ENTITIES} from "@lib/entities";

config({path: join(process.cwd(), '.env')})

const configService = new ConfigService()

const options = (): DataSourceOptions => {
  const url = configService.get('DB_URL')
  if (!url) {
    throw new Error('Database URL is empty!')
  }

  return {
    type: "postgres",
    url: configService.get<string>('DB_URL'),
    logging: configService.get('IS_PROD') === 'false',    // If IS_PROD - off logs
    entities: [
      join(DIR_NAME, 'dist', 'libs', 'entities', '**', '*.entity.{ts,js}')
    ],
    migrations: [join(DIR_NAME, 'migrations', '**', '*migration.ts')],
    migrationsRun: true,     // check migrations on start project
    migrationsTableName: 'migrations'
  }
}

export const appDataSource = new DataSource(options())
