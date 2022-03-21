<template>
  <div class="org" @keydown.delete="delActive" tabindex="0">
    <div @click="toggleMonitor" class="btn monitor-toggle">
      <fa-icon icon="display" />
    </div>
    <div class="categories" v-if="show" @click="hideSubmenu">
      <category :active="active" v-for="(cate, i) in categories" :key="i" :cate="cate" />
      <div @click="addCategory" class="btn-back category-add">
        <fa-icon icon="plus" />
      </div>
    </div>
    <submenu @del="delActive" />
  </div>
</template>

<script setup>
import { ipcRenderer } from "electron";
import Submenu from "./DeskOrg/Submenu.vue";
import Category from "./DeskOrg/Category.vue";
import { ref } from "vue";
import bus from "@/utils/bus";

async function toggleMonitor() {
  let stat = await ipcRenderer.invoke("monitor-stat");
  if (!stat) ipcRenderer.send("show-monitor");
  else ipcRenderer.send("hide-monitor");
}

const show = ref(true);
const categories = ref([]);
function updateCategories() {
  ipcRenderer.invoke("get-categories").then((val) => {
    categories.value = val;
    show.value = false;
    setTimeout(() => (show.value = true), 0);
  });
}
updateCategories();
ipcRenderer.on("update-categories", updateCategories);

function addCategory() {
  ipcRenderer.send("add-category");
}

const active = ref([]);
bus.on("select-active", (ident) => {
  active.value = ident;
});
function hideSubmenu() {
  bus.emit("hide-submenu");
}
function delActive() {
  if (active.value.length > 0) {
    ipcRenderer.send("del-active", active.value.slice());
    bus.emit("hide-submenu");
  }
}
</script>

<style lang="scss" scoped>
.monitor-toggle {
  padding: 5px 0;
}

.org {
  margin-top: 10px;
  outline: none;
}

.categories {
  overflow-y: scroll;
  height: calc(100vh - 80px);
  margin-top: 10px;
}

.category-add {
  margin: 40px 10px;
  padding: 10px 0;
  font-size: 25px;
  border-radius: 5px;
}
</style>
