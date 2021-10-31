<template>
  <SideBar :items="sidebarItems" :cssConfig="cssConfig" left>
    <!--    <template v-slot:logo>-->
    <!--      <img :src="require('./assets/percent.svg')"/>-->
    <!--    </template>-->
  </SideBar>
  <Table
    :microserviceName="microserviceName"
    :modelName="modelName"
    :url="url"
    :cssConfig="mainCssConfig"
    card
  ></Table>
  <router-view />
</template>
<script>
import { sidebarConfig } from '@/components/SideBar/assets/sidebarMetadata'
import { cssConfig } from '@/components/SideBar/assets/cssConfig'
import { mainCssConfig } from '@/mainCssConfig'
import SideBar from '@/components/SideBar/SideBar'
import Table from '@/components/Table/Table'
export default {
  name: 'App',
  components: {
    SideBar,
    Table,
  },
  data() {
    return {
      sidebarItems: sidebarConfig,
      cssConfig: cssConfig,
      mainCssConfig: mainCssConfig,
      microserviceName: 'monolit',
      modelName: 'User',
      url: 'url',
    }
  },
  methods: {},
}
</script>
<style lang="scss">
@import 'components/Table/assets/tableStyles';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f0f6f9;
  min-height: 100vh;
  height: auto;
}
</style>
