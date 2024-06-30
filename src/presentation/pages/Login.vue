<template>
  <div class="login-container">
    <div class="card">
      <h2>Login</h2>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required id="email">
          <span v-if="formSubmitted && !isEmailValid" class="text-danger">Invalid email address</span>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required id="password">
          <span v-if="formSubmitted && !isPasswordStrong" class="text-danger">Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character</span>
        </div>
        <button type="submit" :disabled="!isFormValid">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { eventBus } from '../../core/event/event-bus';
import Toast from "../../components/Toast.vue";

export default defineComponent({
  components: {
    Toast
  },
  setup() {

    const store = useStore();
    const router = useRouter();
    const formSubmitted = ref(false);
    const state = reactive({
      email: '',
      password: ''
    });

    const isEmailValid = computed(() => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(state.email);
    });

    const isPasswordStrong = computed(() => {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordPattern.test(state.password);
    });

    const isFormValid = computed(() => isEmailValid.value && isPasswordStrong.value);


    const login = async () => {
      try {
        await store.dispatch('auth/login', {
          email: state.email,
          password: state.password
        });
        router.push('/dashboard');
      } catch (error) {
        console.error('Login failed', error);
      }
    };

    const submitLogin = async () => {
      console.log('submitLogin');
      formSubmitted.value = true;
      if (isFormValid.value) {
        try {
          // Simulating async action with setTimeout
          // Replace this with actual login logic using Vuex or API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Dispatch action to Vuex store (example)
          await store.dispatch('auth/login', {
            email: state.email,
            password: state.password
          });

          // Simulate successful login
          eventBus.emit('toast:show', {
            id: 'login-success',
            title: 'Success',
            message: 'Login successful!',
            type: 'toast-success'
          });

          // Redirect to dashboard or another route
          router.push('/dashboard');
        } catch (error) {
          console.error('Login failed', error);
          eventBus.emit('toast:show', {
            id: 'login-error',
            title: 'Error',
            message: 'Failed to login. Please try again later.',
            type: 'toast-error'
          });
        }
      } else {
        eventBus.emit('toast:show', {
          id: 'form-error',
          title: 'Error',
          message: 'Please fill in all fields correctly.',
          type: 'toast-error'
        });
      }
    };

    return {
      ...state,
      isEmailValid,
      isPasswordStrong,
      isFormValid,
      submitLogin,
      formSubmitted
    };
  }
});
</script>

<style scoped>
/* Add your scoped styles here if needed */
</style>
