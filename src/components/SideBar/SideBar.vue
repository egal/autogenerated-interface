<template>
  <div class="main-container" :style="{ width: width }">
    <div class="burger-nav" :class="{ closed: !openNav }">
      <slot name="burger-nav">
        <button class="burger-btn" @click="openNav = !openNav" :class="{ open: openNav }"></button>
      </slot>
    </div>
    <transition name="slide">
      <div class="side-bar-container" v-if="openNav">
        <div class="side-bar-content">
          <div v-for="item in items" :key="item.route">
            <SideBarItem :item="item"></SideBarItem>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SideBarItem from '@/components/SideBar/SideBarItem'
export default {
  name: 'SideBar',
  components: { SideBarItem },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [
        {
          label: String,
          route: String,
          icon: String,
          children: Array | undefined,
        },
      ],
    },
    show: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'left',
    },
    width: {
      type: String,
      default: '260px',
    },
  },
  data() {
    return {
      openNav: false,
    }
  },
}
</script>

<style scoped lang="scss">
@import 'sidebar';
</style>
