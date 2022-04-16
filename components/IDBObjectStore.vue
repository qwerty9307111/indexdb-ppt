<template>
  <Button @click="open">open</Button>
  <Button @click="close">close</Button>
  <Button @click="deleteDBAll">delete</Button>
  <Button @click="push">insert</Button>
  <Button @click="query">get</Button>
  <Button @click="query">getAll</Button>
</template>
<script>
import Mixins from './Mixins'
export default {
  mixins: [ Mixins ]
}
</script>
