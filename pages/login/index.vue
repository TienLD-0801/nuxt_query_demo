<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" autocomplete="email" />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      autocomplete="current-password"
    />
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts" setup>
import type { UserInfo } from '~/shared/types/user';

definePageMeta({
  middleware: 'auth-guard',
});
const { $clientMqtt } = useNuxtApp();
const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const { data: user, status } = await useFetch<UserInfo>('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
      responseType: 'json',
    });

    if (status.value === 'success') {
      localStorage.setItem('token', JSON.stringify(user.value?.token));
      $clientMqtt.connect(`${user.value?.email}-${user.value?.id}`);
      await navigateTo('/');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>
