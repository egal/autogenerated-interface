<template>
  <div class="sidebar" :style="cssVars">
    <div class="logo-details">
      <div class="logo_name">
        <slot name="logo">{{ items.sidebarTitle }}</slot>
      </div>
      <div @click="openNav">
        <slot name="burger-icon" v-if="!top">
          <i class="bx bx-menu" id="btn"></i>
        </slot>
      </div>
    </div>
    <ul class="nav-list">
      <li v-for="item in items.sidebarItems" :key="item.route">
        <SideBarItem
          :item="item"
          :top="top"
          :hide-tooltip="item.children ? true : top"
          :is-active="isActiveRoute(item.route)"
          :is-open="isOpen"
        ></SideBarItem>
      </li>

      <li class="footer-item" v-if="!top">
        <slot name="footer">
          <i class="bx bx-log-out" id="log_out"></i>
        </slot>
      </li>
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
    cssConfig: {
      type: Object,
      default: () => ({
        mainDarkColor: '#2F3375',
        mainAccentColor: '#0083FF',
        mainLightColor: '#F0F6F9',
        mainWhiteColor: '#FFFEFF',
        footerBackground: '#1D1F49',
        iconWidth: 18,
        iconHeight: 18,
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
        sidebarBorderRadius: '0 10px 10px 0',
      }),
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  mounted() {
    this.left
      ? import('./assets/sidebarLeft.scss')
      : this.right
      ? import('./assets/sidebarRight.scss')
      : import('./assets/sidebarTop.scss')
  },
  computed: {
    cssVars() {
      return {
        '--dark-color': this.cssConfig.mainDarkColor,
        '--light-accent-color': this.cssConfig.lightAccentColor,
        '--light-secondary-color': this.cssConfig.lightSecondaryColor,
        '--accent-color': this.cssConfig.mainAccentColor,
        '--light-color': this.cssConfig.mainLightColor,
        '--white-color': this.cssConfig.mainWhiteColor,
        '--footer-background': this.cssConfig.footerBackground,
        '--box-shadow': this.cssConfig.boxShadow,
        '--icon-width': this.cssConfig.iconWidth,
        '--icon-height': this.cssConfig.iconHeight,
        '--sidebar-border-radius': this.cssConfig.sidebarBorderRadius,
        '--header-color': this.cssConfig.headerColor,
        '--light-gray-color': this.cssConfig.lightGrayColor,
        '--dark-gray-color': this.cssConfig.darkGrayColor,
        '--bold-box-shadow': this.cssConfig.boldBoxShadow,
        '--main-border-radius': this.cssConfig.mainBorderRadius,
      }
    },
  },
  methods: {
    openNav() {
      let sidebar = document.querySelector('.sidebar')
      sidebar.classList.toggle('open')
      this.isOpen = !this.isOpen
    },
    isActiveRoute(route) {
      if (route === '/') {
        return this.$route.path === route
      } else {
        return this.$route.path && this.$route.path.includes(route)
      }
    },
  },
}
</script>

<style scoped lang="scss"></style>
