<template>
  <div>
    <friendHeader></friendHeader>
  </div>
</template>

<script>
import axios from "axios";
import friendHeader from "./friendHeader";
export default {
  name: "friend",
  components:{
    friendHeader,
  },
}
</script>

<style scoped>

</style>
