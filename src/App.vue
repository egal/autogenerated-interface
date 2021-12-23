<template>
  <!--  <SideBar :items="sidebarItems" :cssConfig="mainCssConfig" right>-->
  <!--    <template v-slot:logo>-->
  <!--      <img :src="require('./assets/percent.svg')" />-->
  <!--    </template>-->
  <!--  </SideBar>-->
  <Table
    :microservice-name="microserviceName"
    :model-name="modelName"
    :metadata-action-name="metadataActionName"
    :table-name="tableName"
    :url="url"
    :css-config="mainCssConfig"
  >
    <!--    <template v-slot:modalContent>-->
    <!--      <h1>hui</h1>-->
    <!--    </template>-->
  </Table>
  <router-view />
</template>
<script>
import { sidebarConfig } from '@/components/SideBar/assets/sidebarMetadata'
import { mainCssConfig } from '@/mainCssConfig'
import Table from '@/components/Table/Table'
import SideBar from '@/components/SideBar/SideBar'
export default {
  name: 'App',
  components: {
    Table,
  },
  data() {
    return {
      sidebarItems: sidebarConfig,
      mainCssConfig: mainCssConfig,
      microserviceName: 'first',
      modelName: 'User',
      url: process.env.VUE_APP_BASE_URL,
      metadataActionName: 'getTablesMetadata',
      tableName: 'UsersMetadata',
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
