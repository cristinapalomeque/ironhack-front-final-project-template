<template>
  <div class="grid grid-cols-4 gap-5 justify-items-center mt-2">
    <h1 class="col-span-4 ml-4 text-cyan-600 text-xl font-extrabold">
      To-Do homepage
    </h1>
    <div class="col-start-2 self-center justify-self-end">Enter email</div>
    <div class="">
      <input
        v-model="email"
        for="email"
        type="email"
        placeholder="Email"
        class="border-solid border-2 border-sky-600 m-4 pl-2"
      />
      <span v-if="emailError">The email must be valid</span>
    </div>

    <div class="col-start-2 self-center justify-self-end">Enter password</div>
    <div>
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

    <div class="col-start-2 justify-self-end">
      <button
        @click="login()"
        class="bg-sky-500 rounded hover:bg-sky-700 px-4 py-2 w-24 text-cyan-50"
      >
        Log in
      </button>
    </div>
    <div>
      <button
        @click="register()"
        class="bg-sky-500 rounded hover:bg-sky-700 px-4 py-2 w-24 text-cyan-50"
      >
        Sign up
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

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
