export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);

  const db = useDatabase('dbSqlDemo');

  await db.sql`
    CREATE TABLE IF NOT EXISTS users (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT,
        Email TEXT,
        Password TEXT,         
        Status TEXT DEFAULT 'offline', 
        LastActive TIMESTAMP          
    )
  `;

  const result = await db.sql`
    INSERT INTO users (Name, Email, Password) VALUES (${requestBody.name}, ${requestBody.email}, ${requestBody.password})
  `;
  console.log(result);

  return {
    message: 'User added successfully',
    userId: result.lastInsertRowid,
  };
});
