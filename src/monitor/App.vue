<template>
  <div id="background">
    <title-bar @close="hideWindow"/>
    <monitor />
  </div>
</template>

<script setup>
import { ipcRenderer } from "electron";
import Monitor from "./components/Monitor.vue";
import TitleBar from "../components/TitleBar.vue";

function hideWindow() {
  ipcRenderer.send("hide-monitor");
}
</script>

<style lang="scss">
@import '../app.scss';
</style>
