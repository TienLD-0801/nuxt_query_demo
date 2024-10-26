export default defineEventHandler(async (event) => {
  const storage = useStorage('tien-free-db');
  const count = Number((await storage.getItem('count')) ?? 0);
  await storage.setItem('count', count + 1, { ttl: 2 });
  return {
    count: await storage.getItem('count'),
  };
});
