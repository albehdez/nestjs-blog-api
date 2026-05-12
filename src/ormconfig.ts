import { TagEntity } from './tag/tag.entity';
import { UserEntity } from './user/user.entity';
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'Blog',
    migrationsTableName: 'migrations',
    migrations: [__dirname + `/migrations/**/*.ts`],
    entities: [TagEntity, UserEntity],
}

const AppDataSource = new DataSource(config);

export { AppDataSource };

export default config;