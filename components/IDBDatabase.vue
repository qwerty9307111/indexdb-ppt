<template>
  <Button @click="open">open</Button>
  <Button @click="close">close</Button>
  <Button @click="deleteDBAll">delete</Button>
</template>
<script>
import Mixins from './Mixins'
export default {
  mixins: [ Mixins ]
}
</script>
