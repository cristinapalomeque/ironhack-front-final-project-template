<template>
  <h1 class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
    Welcome to your To-Do List!
  </h1>
  <div
    class="m-auto task-list w-2/3 justify-center flex-col text-emerald-800 border-solid border-2 border-emerald-200"
  >
    <div class="flex hover:bg-emerald-300" v-for="task in taskStore.tasks">
      <input
        class="ml-4"
        type="checkbox"
        v-model="task.is_complete"
        @click="toggleCheck(task)"
      />
      <p class="ml-2">
        {{ task.title }}
      </p>
      <button
        @click="deleteTask(task)"
        class="text-emerald-800 border-solid border-2 border-emerald-200 px-2 mx-6"
      >
        <font-awesome-icon icon="fa-regular fa-trash"></font-awesome-icon>
        <font-awesome-icon icon="fa-solid fa-user-secret" />

        Delete
      </button>
    </div>
  </div>

  <button
    @click="logout()"
    class="bg-emerald-400 rounded hover:bg-emerald-700 text-white px-4 py-2 w-24 m-4"
  >
    Log out
  </button>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
import { useTaskStore } from "../store/task";

const userStore = useUserStore();
const router = useRouter();
const taskStore = useTaskStore();

taskStore.fetchTasks().then(() => {
  console.log(taskStore.tasks);
});

function toggleCheck(task) {
  console.log(task);
  taskStore
    .toggleCompleted(task)
    .then(() => {
      console.log("Toggle done");
    })
    .catch((e) => {
      console.log(e);
    });
}

function deleteTask(task) {
  console.log(task);
  taskStore
    .deleteTask(task)
    .then(() => {
      console.log("Task deleted");
      taskStore.fetchTasks();
    })
    .catch((e) => {
      console.log(e);
    });
}

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
