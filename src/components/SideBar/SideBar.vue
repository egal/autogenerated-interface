<template>
  <div class="sidebar">
    <div class="logo-details">
      <div class="logo_name">
        <slot name="logo">{{ items.sidebarTitle }}</slot>
      </div>
      <slot name="burger-icon" v-if="!top">
        <i class="bx bx-menu" id="btn" @click="openNav"></i>
      </slot>
    </div>
    <ul class="nav-list">
      <li v-for="item in items.sidebarItems" :key="item.route">
        <SideBarItem :item="item"></SideBarItem>
      </li>
      <slot name="footer" v-if="!top">
        <li class="footer-item">
          <i class="bx bx-log-out" id="log_out"></i>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
import SideBarItem from '@/components/SideBar/SideBarItem'

export default {
  name: 'test',
  components: { SideBarItem },
  props: {
    items: {
      type: Object,
    },
    right: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.left
      ? import('./sidebarLeft.scss')
      : this.right
      ? import('./sidebarRight.scss')
      : import('./sidebarTop.scss')
  },
  methods: {
    openNav() {
      let sidebar = document.querySelector('.sidebar')
      sidebar.classList.toggle('open')
    },
  },
}
</script>

<style scoped lang="scss"></style>
