// import redisDriver from 'unstorage/drivers/redis';

export default defineNitroPlugin(async (nitroApp) => {
  // const storage = useStorage();
  // const { redis } = useRuntimeConfig().public;
  // const driver = redisDriver({
  //   base: 'redis',
  //   username: 'default',
  //   host: redis?.host,
  //   port: Number(redis?.port),
  //   password: redis?.password,
  // });
  // // Mount driver
  // storage.mount('redis', driver);
  // try {
  //   await storage.setItem('redis:test', 'connection-check', { ttl: 1000 });
  //   const result = await storage.getItem('redis:test');
  //   console.log(result);
  //   if (result === 'connection-check') {
  //     console.log('Redis connected successfully');
  //   } else {
  //     console.log('Failed to verify Redis connection');
  //   }
  // } catch (error) {
  //   console.error('Redis connection failed:', error);
  // }
});
