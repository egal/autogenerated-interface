<template>
  <router-link :to="item.route">
    <div class="item-container">
      <div
        class="item"
        @click="childrenOpen = !childrenOpen"
        :class="{ 'child-item': item.children }"
      >
        <i :class="item.icon"></i>
        <div class="link-container">
          <span class="links_name">{{ item.label }}</span>
          <i
            v-if="item.children"
            class="arrow down bx bxs-down-arrow"
            :class="{ arrowOpen: childrenOpen }"
          ></i>
        </div>
        <span class="tooltip" v-if="!hideTooltip">{{ item.label }}</span>
      </div>
    </div>
    <div v-if="item.children && childrenOpen" class="children-container">
      <div>
        <div class="children-content" v-for="child in item.children" :key="child.route">
          <SideBarItem :item="child"></SideBarItem>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'SideBarItem',
  data() {
    return {
      childrenOpen: false,
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({
        label: '',
        route: '',
        icon: '',
        children: [],
      }),
    },
    hideTooltip: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    window.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.childrenOpen = false
      }
    })
  },
}
</script>

<style scoped lang="scss"></style>
