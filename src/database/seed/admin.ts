import PostgresDataSource from '../index';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

// not working
// to run inside docker -- npx ts-node-dev ./src/database/seed/admin.ts 
async function create() {
  const db = PostgresDataSource;

  const id = uuidV4();
  const password = await hash('admin', 5);

  await db.query(`
    INSERT INTO USERS(id, name, email, password, isAdmin, created_at)
      VALUES ('${id}', 'admin', 'admin@google.com', '${password}', true, now())
  `);
}

// eslint-disable-next-line no-console
create().then(() => console.log('User admin created!'));