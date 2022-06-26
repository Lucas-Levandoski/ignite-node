import { DataSource } from 'typeorm';

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin'
});

PostgresDataSource.initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('data source has been initialized');
  })
  .catch((err) => {
    console.error(err);
  });
