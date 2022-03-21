<template>
  <div class="category">
    <div class="header">
      <div @click="show = !show" class="btn">
        <fa-icon :icon="show ? 'caret-up' : 'caret-down'" />
      </div>
      <input
        type="text"
        @blur="chgName"
        class="cate-title"
        v-model="cate"
        @keydown.enter="(e) => e.srcElement.blur()"
      />
      <div @click="deleteThis" class="btn">
        <fa-icon icon="trash-can" />
      </div>
    </div>
    <div v-show="show" class="droparea" @drop="drop" @dragover="prevent">
      <shortcut
        v-for="(shortcut, i) in shortcuts"
        :key="i"
        :model="shortcut"
        @contextmenu="showSubmenu($event, shortcut.filename)"
        @click="selectActive(shortcut.filename)"
        :class="{ active: active[0] == cate && active[1] == shortcut.filename }"
        @dblclick="open(shortcut.filename)"
        draggable="true"
        @dragstart="startDrag($event, shortcut.filename, shortcut.icon)"
      />
    </div>
  </div>
</template>

<script setup>
import { ipcRenderer } from "electron";
import { ref, watch } from "vue";
import Shortcut from "./Category/Shortcut.vue";
import bus from "@/utils/bus";

const props = defineProps({
  active: String,
  cate: String,
});
let cate = ref(props.cate);
let ocate = cate.value;
function chgName() {
  ipcRenderer.send("chg-name", ocate, cate.value);
  ocate = cate.value;
}

function prevent(e) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e) {
  let files = e.dataTransfer.files;
  for (let file of files) ipcRenderer.send("move", cate.value, file.path);
}
function open(file) {
  ipcRenderer.send("open", cate.value, file);
}
function startDrag(e, file, icon) {
  e.preventDefault();
  ipcRenderer.send("start-drag", cate.value, file, icon);
}
function deleteThis() {
  ipcRenderer.send("del-category", cate.value);
}

const shortcuts = ref([]);
function updateShortcuts() {
  ipcRenderer.invoke("get-shortcuts", cate.value).then((val) => (shortcuts.value = val));
}
updateShortcuts();
ipcRenderer.on("update-shortcuts", updateShortcuts);

const show = ref(true);

function showSubmenu(e, filename) {
  bus.emit("select-active", [cate.value, filename]);
  bus.emit("show-submenu", [e.clientX, e.clientY]);
}
function selectActive(filename) {
  if (props.active[0] == cate.value && props.active[1] == filename)
    bus.emit("select-active", []);
  else bus.emit("select-active", [cate.value, filename]);
}
</script>

<style lang="scss" scoped>
.droparea {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .cate-title {
    text-align: center;
    background: transparent;
    color: white;
    font-weight: bold;
    font-size: 25px;
    width: 60%;
    border: none;
    outline: none;
    padding: 8px 0;
  }
}

.btn {
  width: 40px;
  height: 40px;
}
</style>
