<template>
  <h1 class="ml-4 bg-gradient-to-r from-cyan-500 to-blue-500">
    To-Do homepage
  </h1>
  <div class="ml-4">
    Enter email
    <input
      v-model="email"
      for="email"
      type="email"
      placeholder="Email"
      class="border-solid border-2 border-sky-600 m-4 pl-2"
    />
    <span v-if="emailError">The email must be valid</span>
  </div>
  <div class="ml-4">
    Enter password
    <input
      v-model="password"
      for="password"
      type="password"
      placeholder="Password"
      class="border-solid border-2 border-sky-600 m-4 pl-2"
    />
    <span v-if="passwordError">
      The password needs to have at least 6 characters</span
    >
  </div>
  <button
    @click="login()"
    class="bg-sky-500 rounded hover:bg-sky-700 px-4 py-2 w-24 m-4"
  >
    Log in
  </button>
  <button
    @click="register()"
    class="bg-sky-500 rounded hover:bg-sky-700 px-4 py-2 w-24"
  >
    Sign up
  </button>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";

const email = ref("");
const password = ref("");
const emailError = ref(false);
const passwordError = ref(false);
const userStore = useUserStore();
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
  console.log("Logging in");
}
</script>

<style lang="scss" scoped></style>
