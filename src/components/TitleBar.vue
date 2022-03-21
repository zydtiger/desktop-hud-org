<template>
  <div id="title-bar">
    <div id="drag-bar"></div>
    <div class="close-btn" @click="$emit('close')">
      <fa-icon icon="xmark" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '../global.scss';

#title-bar {
  width: 100%;
  height: 20px;
  background: #00000044;
  border-top-left-radius: $bRadius;
  border-top-right-radius: $bRadius;
  display: flex;
  align-items: center;
  justify-content: space-between;

  #drag-bar {
    -webkit-app-region: drag;
    height: 100%;
    width: calc(100% - 20px);
  }

  .close-btn {
    height: 20px;
    width: 20px;
    color: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #ddd;
      animation: spin 0.5s ease-in-out;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
