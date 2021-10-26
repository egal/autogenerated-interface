<template>
  <SideBar :items="sidebarItems" :cssConfig="cssConfig" left>
    <!--    <template v-slot:logo>-->
    <!--      <img :src="require('./assets/percent.svg')"/>-->
    <!--    </template>-->
    <!--    <template v-slot:footer>-->
    <!--      <img :src="require('./assets/percent.svg')"/>-->
    <!--    </template>-->
  </SideBar>
  <router-view />
</template>
<script>
import { sidebarConfig } from '@/components/SideBar/assets/sidebarMetadata'
import { cssConfig } from '@/components/SideBar/assets/cssConfig'
import SideBar from '@/components/SideBar/SideBar'
export default {
  name: 'App',
  components: {
    SideBar,
  },
  data() {
    return {
      sidebarItems: sidebarConfig,
      cssConfig: cssConfig,
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
