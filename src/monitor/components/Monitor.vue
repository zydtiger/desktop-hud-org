<template>
  <div class="monitor">
    <pre>HOST:&Tab;{{ hostname }} {{ platform }} ({{ arch }})</pre>
    <pre>UPT:&Tab;{{ uptime[0] }}hrs {{ uptime[1] }}mins</pre>
    <pre>CPU:&Tab;{{ cpuUsage }}% ({{ cpuCnt }}T)</pre>
    <pre>MEM:&Tab;{{ memUsage }}% {{ memUsed }}GB / {{ memTotal }}GB</pre>
    <pre>DISK:&Tab;{{ diskUsage }}% {{ diskUsed }}GB / {{ diskTotal }}GB</pre>
  </div>
</template>

<script setup>
import { ipcRenderer } from "electron";
import { ref } from "vue";

const cpuUsage = ref(0);
const cpuCnt = ref(0);

const memUsage = ref(0);
const memUsed = ref(0);
const memTotal = ref(0);

const diskUsage = ref(0);
const diskUsed = ref(0);
const diskTotal = ref(0);

const hostname = ref("");
const platform = ref("");
const arch = ref("");
const uptime = ref([]);

ipcRenderer.on("cpu", (_, usage) => {
  cpuUsage.value = usage.toFixed(1);
});
ipcRenderer.on("gen", (_, Hostname, Platform, Arch, CpuCnt, Uptime) => {
  hostname.value = Hostname;
  platform.value = Platform;
  arch.value = Arch;
  cpuCnt.value = CpuCnt;
  let hrs = Math.floor(Uptime / 3600);
  let mins = Math.floor(Uptime / 60) - hrs * 60;
  uptime.value = [hrs, mins];
});
ipcRenderer.on("mem", (_, usedMem, totalMem) => {
  memUsage.value = ((usedMem / totalMem) * 100).toFixed(1);
  memUsed.value = (usedMem / 1024).toFixed(1);
  memTotal.value = (totalMem / 1024).toFixed(1);
});
ipcRenderer.on("disk", (_, used, tot) => {
  diskUsage.value = ((used / tot) * 100).toFixed(1);
  diskUsed.value = (used / 1024 / 1024 / 1024).toFixed(1);
  diskTotal.value = (tot / 1024 / 1024 / 1024).toFixed(1);
});
</script>

<style lang="scss" scoped>
.monitor {
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
}
pre {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;

  color: #fff;
  margin-top: 0;
  margin-bottom: 5px;
}
</style>
