import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function up(queryInterface) {
  const password = await bcrypt.hash('password', 10);

  await queryInterface.bulkInsert('Users', [{
    id: uuidv4(),
    name: 'Admin',
    email: 'admin@mail.com',
    password,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
}
