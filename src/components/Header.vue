<template>
  <div class="flex justify-between">
    <img class="h-14 w-auto" src="logo_butler.png" alt="Butler TodoList" />

    <button
      @click="logout()"
      v-if="logged"
      class="bg-emerald-400 rounded hover:bg-emerald-700 text-white px-4 py-2 w-24 m-4"
    >
      Log out
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const userStore = useUserStore();
const router = useRouter();
const props = defineProps({ logged: Boolean });

function logout() {
  Swal.fire({
    title: "Do you really want to log out?",
    input: "",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No way",
  }).then((result) => {
    if (result.isConfirmed) {
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
  });
}

/*
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

*/
</script>

<style lang="scss" scoped></style>
