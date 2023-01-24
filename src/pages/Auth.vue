<template>
  <Header :logged="false"></Header>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-24 w-auto"
          src="../assets/logo_butler.png"
          alt="Butler TodoList"
        />
        <h2
          class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900"
        >
          Your ready to go todo list app
        </h2>
      </div>

      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
            v-model="email"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <span v-if="emailError">The email must be valid</span>
      </div>
      <span v-if="passwordError">
        The password needs to have at least 6 characters</span
      >
      <div>
        <button
          @click="login()"
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-800 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <!-- Heroicon name: mini/lock-closed -->
            <svg
              class="h-5 w-5 text-white-600 group-hover:text-emerald-500"
              xmlns="]"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Log in
        </button>

        <button
          @click="register()"
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-emerald-800 bg-white py-2 px-4 text-sm font-medium text-emerald-800 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <!-- Heroicon name: mini/lock-closed -->
            <svg
              class="h-5 w-5 text-emerald-800 group-hover:text-emerald-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";

const email = ref("");
const password = ref("");
const emailError = ref(false);
const passwordError = ref(false);
const userStore = useUserStore();
const router = useRouter();
function register() {
  // check if email is valid
  // check if password has at least 6 characters
  if (!email.value.includes("@")) {
    // show error
    emailError.value = true;
    setTimeout(() => {
      emailError.value = false;
    }, 5000);
    // setTimeout de 5000 k posi a false;
  } else if (password.value.length < 6) {
    passwordError.value = true;
    setTimeout(() => {
      passwordError.value = false;
    }, 5000);
  } else {
    console.log("Registering user");
    console.log(email.value, password.value);
    userStore
      .signUp(email.value, password.value)
      .then(() => {
        // Redirect to Home
        console.log("Tot ha anat be");
      })
      .catch((e) => {
        // show error
        console.log(e);
      });
  }
}

function login() {
  if (!email.value.includes("@")) {
    // show error
    emailError.value = true;
    setTimeout(() => {
      emailError.value = false;
    }, 5000);
    // setTimeout de 5000 k posi a false;
  } else if (password.value.length < 6) {
    passwordError.value = true;
    setTimeout(() => {
      passwordError.value = false;
    }, 5000);
  } else {
    console.log("Logging in");
    console.log(email.value, password.value);
    userStore
      .signIn(email.value, password.value)
      .then(() => {
        // Redirect to Home
        console.log("Logged in be");
        router.push({ path: "/" });
      })
      .catch((e) => {
        // show error
        console.log(e);
      });
  }
}
</script>

<style lang="scss" scoped></style>
