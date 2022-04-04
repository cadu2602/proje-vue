<template>
  <h1>LifeCycle hooks</h1>
</template>

<script>
import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(() => {
      console.log('Composing API')
    })
  },
};

// export default {
//   name: "LifeCycle",
//   mounted() {
//     console.log('i dont now')
//   },
// };
</script>

<style>
</style>