<template>
  <div class="flex justify-end">
    <button
      @click="logout()"
      class="bg-emerald-400 rounded hover:bg-emerald-700 text-white px-4 py-2 w-24 m-4"
    >
      Log out
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
import { useTaskStore } from "../store/task";
import Header from "./Header.vue";

const userStore = useUserStore();
const router = useRouter();
const taskStore = useTaskStore();

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
