<template>
  <div id="submenu" v-show="active" :style="{ left: `${pos.x}px`, top: `${pos.y}px` }">
    <div class="btn-back" @click="$emit('del')">
      <fa-icon icon="trash-can" />
      <p>Delete</p>
    </div>
  </div>
</template>

<script setup>
import bus from "@/utils/bus";
import { reactive, ref } from "vue";
import { ipcRenderer } from "electron";

const active = ref(false);
const pos = reactive({
  x: 0,
  y: 0,
});
bus.on("show-submenu", ([x, y]) => {
  active.value = true;
  pos.x = x;
  pos.y = y;
});

bus.on("hide-submenu", () => {
  active.value = false;
});
</script>

<style lang="scss" scoped>
#submenu {
  position: absolute;
  border-radius: 5px;
  background-color: #fffa;
  width: 100px;
  padding: 5px;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
    padding: 5px;

    p {
      padding-top: 3px;
      margin: 0;
      margin-left: 5px;
    }
  }
}
</style>
