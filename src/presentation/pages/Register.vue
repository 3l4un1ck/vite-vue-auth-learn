<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      email: '',
      password: ''
    });

    const register = async () => {
      try {
        await store.dispatch('auth/register', {
          email: state.email,
          password: state.password
        });
        router.push('/dashboard');
      } catch (error) {
        console.error('Registration failed', error);
      }
    };

    return {
      ...state,
      register
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
