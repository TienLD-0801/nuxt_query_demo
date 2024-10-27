import { User } from '~/Models/User';

export default defineEventHandler(async (event) => {
  const db = useDatabase('dbSqlDemo');
  const requestBody = await readBody(event);

  const { rows } = await db.sql`
    SELECT * FROM users 
    WHERE Email = ${requestBody.email} AND Password = ${requestBody.password}
  `;

  if (rows && rows.length > 0) {
    const user = rows[0] as unknown as User;
    const { password, ...userInfo } = user;

    return {
      message: 'Login successful',
      user: userInfo,
    };
  } else {
    return {
      message: 'Invalid email or password',
    };
  }
});
