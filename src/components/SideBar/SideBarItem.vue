<template>
  <router-link :to="item.route">
    <div class="item-container">
      <div class="item" @click="childrenOpen = !childrenOpen">
        <i :class="item.icon"></i>
        <span class="links_name">{{ item.label }}</span>
        <span class="tooltip">{{ item.label }}</span>
      </div>
      <div v-if="item.children && childrenOpen" class="children-container">
        <div>
          <div class="children-content" v-for="child in item.children" :key="child.route">
            <SideBarItem :item="child"></SideBarItem>
          </div>
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
  },
}
</script>

<style scoped lang="scss"></style>
