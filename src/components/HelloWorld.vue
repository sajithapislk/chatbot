<!-- src/components/HelloWorld.vue -->
<template>
    <div>
      <p>{{ msg }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      msg: String
    }
  }
  </script>
  