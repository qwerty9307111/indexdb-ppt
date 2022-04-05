<template>
  <button class="button">
    <slot />
  </button>
</template>
<style scoped>
.button {
  font-size: 12px;
  padding: 6px 10px;
  background-color: #006eff;
  border-radius: 3px;
  color: white;
}
.button:not(:first-of-type) {
  margin-left: 10px;
}
</style>
