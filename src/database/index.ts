import { DataSource } from 'typeorm';

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres_database',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'ignite',
  migrations: [
    './src/database/migrations/*.ts'
  ],
  entities: [
    'src/**/entities/*{.ts,.js}'
  ]
});

PostgresDataSource.initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('data source has been initialized');
  })
  .catch((err) => {
    console.error(err);
  });

export default PostgresDataSource;
