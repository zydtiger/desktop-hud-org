<template>
  <div class="shortcut" :title="basename(model.filename)">
    <img :src="'data:image/png;base64,' + model.icon" alt="" />
    <p>{{ basename(model.filename) }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  model: {
    file: String,
    icon: String,
  },
});

function basename(file) {
  let i;
  for (i = file.length - 1; i >= 0; i--) if (file[i] == ".") break;
  return file.substring(0, i);
}
</script>

<style lang="scss" scoped>
.shortcut {
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 5px;

  &.active {
    background-color: rgba(0, 119, 255, 0.333);
    border: 1px dashed lightgray;
  }

  img {
    width: 60px;
    height: 60px;
  }

  p {
    margin: 0;
    margin-top: 5px;
    font-size: 14px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
