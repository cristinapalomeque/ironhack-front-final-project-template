<template>
  <Header :logged="true"> </Header>
  <h1
    class="mt-6 mb-4 text-center text-2xl font-bold tracking-tight text-gray-900"
  >
    Welcome to your To-Do List!
  </h1>

  <div class="flex justify-center">
    <button
      @click="showAdd = true"
      class="text-white bg-emerald-500 border-solid border-2 hover:bg-emerald-700 border-emerald-600 px-2 mx-6 mb-3"
    >
      Add task
    </button>
  </div>
  <div v-if="showAdd" class="flex justify-around mb-5 p-5">
    <div
      class="flex flex-col md:flex-row mb-5 bg-emerald-200 mx-20 mb-3 p-5 border-dashed border-2 border-black"
    >
      <input
        class="text-emerald-800 border-solid border-2 border-emerald-600 px-2 mx-6 md:mb-0"
        placeholder="type task"
        v-model="newTask.title"
      />
      <button
        class="text-emerald-800 bg-slate-300 border-solid border-2 border-emerald-600 hover:bg-emerald-400 px-2 mx-6 md:mb-0 w-20 self-center"
        @click="saveNewTask()"
      >
        Save
      </button>
      <button
        class="text-emerald-800 bg-slate-300 border-solid border-2 border-emerald-600 hover:bg-emerald-400 px-2 mx-6 w-20 self-center"
        @click="showAdd = false"
      >
        Cancel
      </button>
    </div>
  </div>
  <div class="flex flex-row justify-center px-2 m-6" v-if="edit">
    <input
      class="text-emerald-800 border-solid border-2 border-emerald-600 px-2 mx-6"
      v-model="currentTask.title"
      placeholder="edit me"
    />
    <button
      class="text-emerald-800 border-solid border-2 border-emerald-600 hover:bg-emerald-400 px-2 mx-6"
      @click="updateTask()"
    >
      Save <i class="fa-solid fa-floppy-disk"></i>
    </button>
    <button
      @click="edit = false"
      class="text-white bg-emerald-500 border-solid border-2 hover:bg-emerald-700 border-emerald-600 px-2 mx-6"
    >
      Cancel <i class="fa-solid fa-xmark"></i>
    </button>
  </div>

  <table
    class="m-auto task-list w-2/3 justify-center text-emerald-800 border-double border-4 border-emerald-500"
  >
    <tr class="hover:bg-emerald-300" v-for="task in taskStore.tasks">
      <td>
        <input
          class="ml-4"
          type="checkbox"
          v-model="task.is_complete"
          @click="toggleCheck(task)"
        />
      </td>
      <td>
        <p class="ml-2" :class="{ 'line-through': task.is_complete }">
          {{ task.title }}
        </p>
      </td>
      <td class="flex justify-end">
        <button @click="startEdit(task)" class="text-emerald-800 px-2 mx-1">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button @click="deleteTask(task)" class="text-emerald-800 px-2 mx-1">
          <i class="fa-sharp fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  </table>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, resolveDirective } from "vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
import { useTaskStore } from "../store/task";
import Header from "../components/Header.vue";

const userStore = useUserStore();
const router = useRouter();
const taskStore = useTaskStore();
const edit = ref(false);
const currentTask = ref(null);
const showAdd = ref(false);
const newTask = ref({ title: "", user_id: userStore.user.id });

taskStore.fetchTasks().then(() => {
  Swal.fire({
    title: "Welcome to your Todo page!",
    text: "",
    icon: "success",
    confirmButtonText: "Close",
    denyButtonText: "Not cool",
    denyButtonColor: "red",
    showCancelButton: false,
  }).then((result) => {
    console.log(result);
  });
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
function updateTask() {
  console.log(currentTask.value);
  taskStore.updateTask(currentTask.value).then(() => {
    console.log("Task updated");
    edit.value = false;
    taskStore.fetchTasks();
  });
}

function startEdit(task) {
  edit.value = true;
  currentTask.value = { ...task };
  console.log(currentTask.value);
}

function saveNewTask() {
  taskStore.saveNewTask(newTask.value).then(() => {
    console.log(newTask.value);
    showAdd.value = false;
    taskStore.fetchTasks();
  });
}

function deleteTask(task) {
  console.log(task);
  Swal.fire({
    title: "Do you really want to delete this task?",
    input: "",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No way",
  }).then((result) => {
    if (result.isConfirmed) {
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
  });

  /* taskStore
    .deleteTask(task)
    .then(() => {
      console.log("Task deleted");
     taskStore.fetchTasks();
    })
    .catch((e) => {
      console.log(e);
    }); */
}

/*
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
*/

/*function logout() {
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
