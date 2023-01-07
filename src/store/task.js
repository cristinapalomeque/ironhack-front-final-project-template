// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        //  .eq("user_id", )
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    async toggleCompleted(task) {
      const data = await supabase
        .from("tasks")
        .update({ is_complete: !task.is_complete })
        .eq("id", task.id);
    },
    // Hacer POST
    // Hacer el PUT (edit)
    // Hacer el delete

    async editTask(task) {
      const { error } = await supabase
        .from("tasks")
        .update({ name: task.title })
        .eq("id", task.id);
    },

    async deleteTask(task) {
      const { error } = await supabase
        .from("tasks")
        .delete(task)
        .eq("id", task.id);
    },
    // Hacer el PUT (cambiar entre completada y pendiente)
  },
});
