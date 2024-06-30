<template>
  <div v-if="show" class="toast" :class="[typeClass]">
    <div class="toast-header">
      <strong class="me-auto">{{ title }}</strong>
      <button @click="close" type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'toast-error' // Default type can be 'toast-error', 'toast-success', etc.
    },
    duration: {
      type: Number,
      default: 5000 // Duration in milliseconds
    }
  },
  setup(props) {
    const show = ref(true);

    watch(
        () => show.value,
        (newValue) => {
          if (newValue) {
            setTimeout(() => {
              show.value = false;
            }, props.duration);
          }
        }
    );

    const close = () => {
      show.value = false;
    };

    return {
      show,
      close
    };
  }
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.toast.show {
  opacity: 1;
}

.toast-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toast-body {
  padding: 1rem;
}

.toast-error {
  background-color: #dc3545;
}

.toast-success {
  background-color: #28a745;
}

.toast-warning {
  background-color: #ffc107;
}

.toast-info {
  background-color: #17a2b8;
}

.btn-close {
  color: white;
  border: none;
  background: none;
  padding: 0;
  margin-left: auto;
  font-size: 1rem;
  cursor: pointer;
}
</style>
