<template>
  <div id="background">
    <title-bar @close="closeWindow" />
    <desk-org/>
  </div>
</template>

<script setup>
import { ipcRenderer } from "electron";
import TitleBar from "../components/TitleBar.vue";
import DeskOrg from './components/DeskOrg.vue';

function closeWindow() {
  ipcRenderer.send('close')
}

</script>

<style lang="scss">
@import '../app.scss';
</style>
