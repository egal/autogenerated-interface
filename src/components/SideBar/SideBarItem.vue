<template>
  <!--  <router-link :to="item.route">-->
  <div class="item-content" @click="childrenOpen = !childrenOpen">
    <div class="item-icon"></div>
    <div>
      {{ item.label }}
      <slot name="arrow-btn"> </slot>
    </div>
  </div>
  <div v-if="item.children && childrenOpen" class="children-container">
    <transition name=" list">
      <div>
        <div class="children-content" v-for="child in item.children" :key="child.route">
          <div>{{ child.icon }}</div>
          <div>{{ child.label }}</div>
        </div>
      </div>
    </transition>
  </div>
  <!--  </router-link>-->
</template>

<script>
export default {
  name: 'SideBarItem',
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
  data() {
    return {
      childrenOpen: false,
    }
  },
}
</script>

<style scoped lang="scss">
@import 'sidebar';
</style>
