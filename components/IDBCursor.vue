<template>
  <Button @click="open">open</Button>
  <Button @click="close">close</Button>
  <Button @click="deleteDBAll">delete</Button>
  <Button @click="push">insert</Button>
  <Button @click="cursorGetData">cursor</Button>
  <Button @click="queryByCursorOnIndex">queryByCursorOnIndex</Button>
</template>
<script>
import Mixins from './Mixins'
export default {
  mixins: [ Mixins ]
}
</script>
