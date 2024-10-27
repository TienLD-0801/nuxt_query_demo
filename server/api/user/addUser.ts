export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);

  const db = useDatabase('dbSqlDemo');

  try {
    await db.sql`
      CREATE TABLE IF NOT EXISTS users (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT,
          Email TEXT UNIQUE, 
          Password TEXT,         
          Status TEXT DEFAULT 'offline', 
          LastActive TIMESTAMP          
      )
    `;

    const existingUser = await db.sql`
      SELECT * FROM users WHERE Email = ${requestBody.email}
    `;

    if ((existingUser.rows ?? []).length > 0) {
      event.node.res.statusCode = 400;
      return {
        message: 'Email already exists',
        success: false,
      };
    }

    const result = await db.sql`
      INSERT INTO users (Name, Email, Password) VALUES (${requestBody.name}, ${requestBody.email}, ${requestBody.password})
    `;

    console.log(result);

    return {
      message: 'User added successfully',
      userId: result.lastInsertRowid,
      success: true,
    };
  } catch (error: any) {
    console.error('Error occurred while adding user:', error);
    event.node.res.statusCode = 500;
    return {
      message: 'An error occurred while processing your request',
      success: false,
      error: error.message,
    };
  }
});
