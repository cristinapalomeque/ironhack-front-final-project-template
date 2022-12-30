<template>
  <h1>Welcome to your To-Do List</h1>
  <button
    @click="logout()"
    class="bg-sky-500 rounded hover:bg-sky-700 px-4 py-2 w-24 m-4"
  >
    Log out
  </button>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

function logout() {
  userStore
    .logout()
    .then(() => {
      // Redirect to Home
      console.log("You are logged out");
      router.push({ path: "/auth" });
    })
    .catch((e) => {
      // show error
      console.log(e);
    });
}
</script>

<style lang="scss" scoped></style>
