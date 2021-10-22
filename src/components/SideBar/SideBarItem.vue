<template>
  <router-link :to="item.route">
    <div class="item-content" @click="childrenOpen = !childrenOpen">
      <div class="item-icon">
        <img :src="require(`../../assets/${item.icon}.png`)" :alt="item.label"/>
      </div>
      <div>
        {{ item.label }}
        <slot name="arrow-btn"> </slot>
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
  methods: {},
}
</script>

<style scoped lang="scss">
@import 'sidebar';
</style>
