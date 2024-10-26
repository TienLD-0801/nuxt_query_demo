<template>
  <div>
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Brand</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody v-if="data">
        <tr v-for="(user, idx) in data.data" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.title }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.picture }}</td>
        </tr>
      </tbody>
      <div v-else>Loading...</div>
    </table>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
  <button @click="getValueRedis">Get Value Redis</button>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const LIMIT = 10;

const currentPage = ref(1);
const totalPages = ref(0);

const fetcher = async (page: number) => {
  const response: any = await fetch(
    `https://dummyapi.io/data/v1/user?page=${page}&limit=10`,
    {
      headers: { 'app-id': '663dc2c3b3624d8637228d9b' },
    }
  );
  const data = await response.json();
  totalPages.value = Math.ceil(data.total / LIMIT);
  return data;
};

const { data } = useQuery({
  queryKey: ['test', currentPage],
  queryFn: () => fetcher(currentPage.value),
  staleTime: 60 * 1000,
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const getValueRedis = async () => {
  if (process.server) {
    const storage = useStorage();
    const result = await storage.getItem('redis:test');
    console.log(result);
  }
};

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<style scoped lang="scss">
.product-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
}

.pagination {
  margin-top: 10px;

  button {
    padding: 8px 16px;
    margin-right: 5px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
