<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-gray-800">Login in your account</h1>

      <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
        &times;
      </button>
    </div>

    <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-gray-800">E-mail</span>
          <input
            v-model="state.email.value"
            type="email"
            :class="{ 'border-brand-danger': !!state.email.errorMessage }"
            class="email-input"
            placeholder="cadu@email.com"
          />
          <span
            v-if="!!state.email.errorMessage"
            class="email-error font-medium text-brand-danger"
          >
            {{ state.email.errorMessage }}
          </span>
        </label>

        <label class="block mt-9">
          <span class="text-gray-800">Password</span>
          <input
            v-model="state.password.value"
            type="password"
            :class="{ 'border-brand-danger': !!state.password.errorMessage }"
            class="email-input"
            placeholder="cadu@email.com"
          />
          <span
            v-if="!!state.password.errorMessage"
            class="email-error font-medium text-brand-danger"
          >
            {{ state.password.errorMessage }}
          </span>
        </label>

        <button
          :disabled="state.isLoading"
          type="submit"
          :class="{
            'opacity-50': state.isLoading
          }"
          class="btn-login font-bold bg-brand-main focus:outline-none transition-all duration-150"
        >
          <icon v-if="state.isLoading" name="loading" class="animate-spin" />
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import useModal from "../../hooks/useModal";
import Icon from "../Icon";
import {
  validateEmptyAndLength,
  validateEmptyEmail,
} from "../../utils/validators";

import services from "../../services";

export default {
  components: { Icon },
  setup() {
    const router = useRouter();
    const modal = useModal();
    const toast = useToast();

    const { value: emailValue, errorMessage: emailErrorMessage } = useField( "email", validateEmptyEmail);
    const { value: passwordValue, errorMessage: passwordErrorMessage } = useField("password", validateEmptyAndLength);

    const state = reactive({
      hasErrors: false,
      isLoading: false, 
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          window.localStorage.setItem("token", data.token);
          router.push({ name: "Credencials" });
          state.isLoading = false;

          modal.close();
          return;
        }

        if (errors.status === 404) {
          toast.error("Email not found");
        }
        if (errors.status === 401) {
          toast.error("Invalid email or password");
        }
        if (errors.status === 400) {
          toast.error("There was an error logging in");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = !!error;
        toast.error("There was an error logging in");
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 28px;
  font-family: "RobotoBlack";
}
span {
  font-size: 18px;
  line-height: 28px;
  font-family: "Roboto", medium;
}
.email-input {
  display: block;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-top: 1px;
  font-size: 18px;
  line-height: 28px;
  background-color: rgb(243 244 246);
  border-color: transparent;
  border-width: 2px;
  border-radius: 0.25rem;
}
.email-error {
  display: block;
}
.btn-login {
  font-size: 18px;
  line-height: 28px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-top: 10px;
  color: rgb(255 255 255);
  border-radius: 9999px;
}
</style>

