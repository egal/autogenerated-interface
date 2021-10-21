<template>
  <div class="home">
    <SideBar :items="sidebarItems"></SideBar>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SideBar from '@/components/SideBar/SideBar.vue'
import { sidebarConfig } from '@/metadata/sidebar' // @ is an alias to /src

@Options({
  components: {
    SideBar,
  },
  data() {
    return {
      sidebarItems: sidebarConfig,
    }
  },
})
export default class Home extends Vue {}
</script>
