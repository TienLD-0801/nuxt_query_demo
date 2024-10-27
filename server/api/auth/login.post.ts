import { User } from '~/Models/User';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const db = useDatabase('dbSqlDemo');

  try {
    const requestBody = await readBody(event);

    const { rows } = await db.sql`
      SELECT * FROM users 
      WHERE Email = ${requestBody.email} AND Password = ${requestBody.password}
    `;

    if (rows && rows.length > 0) {
      const user = rows[0] as unknown as User;
      const { password, ...userInfo } = user;

      const token = jwt.sign(
        { id: userInfo.id, email: userInfo.email },
        'abc-example',
        { expiresIn: '1h' }
      );

      return {
        token,
        message: 'Login successful',
        user: userInfo,
      };
    } else {
      event.node.res.statusCode = 401;
      return {
        message: 'Invalid email or password',
      };
    }
  } catch (error) {
    console.error('Error occurred during login:', error);

    event.node.res.statusCode = 500;
    return {
      message: 'An error occurred while processing your request',
      success: false,
      error: error,
    };
  }
});
