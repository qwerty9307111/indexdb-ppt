<template>
  <div class="events">
    <div class="left">
      <button class="el-button" id="button" ref="button" @click="handleClick">触发点击事件</button>
      <button class="el-button ml-5" @click="eventLoop">开始事件循环</button>
    </div>
    <div class="result">
      <p v-for="(text, index) in result" :key="index">{{text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: [],
    };
  },
  activated () {
    this.result = []
  },
  methods: {
    handleClick() {
      this.log('click')
    },
    log (msg) {
      this.result.push(msg)
      console.log(msg)
    },
    sleep (time = 3000) {
      const start = Date.now();

      while (Date.now() - start <= time) {}
    },
    eventLoop() {
      this.result = []
      setTimeout(() => this.log("setTimeout"), 0)

      this.$refs.button.click()

      // const request = indexedDB.open('name', 1)
      // request.onsuccess = event => {
      //   this.log('success')
      // }
      // request.onerror = event => {
      //   this.log('error')
      // }

      Promise.resolve("Promise").then((msg) => {
        this.sleep(2000)
        this.log(msg)
      });

      this.log("start")

      this.sleep(3000)

      this.$refs.button.dispatchEvent(new Event('click'))
      this.log("end")
    },
  },
};
</script>
<style scoped>
.events {
  padding-left: 20px;
}
.el-button {
  font-size: 12px;
  padding: 12px 20px;
  background-color: #006eff;
  border-radius: 3px;
  color: white;
}
</style>
