<script>
export default {
  data () {
    return {
      style: ''
    }
  },
  created () {
    const styleList = [
      {
        backgroundImage: 'linear-gradient(45deg, #eea2a4 10%, #5c2223 20%)'
      },
      {
        backgroundImage: 'linear-gradient(45deg, #f07c82 10%, #5a191b 20%)'
      },
      {
        backgroundImage: 'linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%)'
      },
      {
        backgroundImage: 'linear-gradient(45deg, #d44ebd99 10%, #a91590d9 20%)'
      },
      {
        backgroundImage: 'linear-gradient(45deg, #4e52d440 10%, #15a9a2ad 20%)'
      }
    ]
    const index = Math.floor((Math.random() * styleList.length))
    this.style = styleList[index]
  }
}
</script>

<template>
  <h1 class="title" :style="style"><slot></slot></h1>
</template>
<style>
.title {
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
