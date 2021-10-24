<template>
  <SideBar :items="sidebarItems" top></SideBar>
  <router-view />
</template>
<script>
import { sidebarConfig } from '@/metadata/sidebar'
import SideBar from "@/components/SideBar/SideBar";
export default {
  name: 'App',
  components: {
    SideBar,
  },
  data() {
    return {
      sidebarItems: sidebarConfig,
    }
  },
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
