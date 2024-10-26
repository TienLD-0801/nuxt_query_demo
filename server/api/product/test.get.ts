export default defineEventHandler(async (event) => {
  return new Promise(async (resolve, reject) => {
    try {
      setCookie(event, 'test', '12345', {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
        secure: false,
      });
      resolve({ user: 'test' });
    } catch (error) {
      reject(error);
    }
  });
});
