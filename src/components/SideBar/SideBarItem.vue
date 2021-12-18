<template>
  <router-link :to="item.route">
    <div class="item-container">
      <div class="item" @click="openNestedNav" :class="{ 'child-item': item.children }">
        <i :class="item.icon"></i>
        <div class="link-container">
          <span class="links_name">{{ item.label }}</span>
          <i
            v-if="item.children && isOpen"
            class="arrow down bx bxs-down-arrow"
            :class="{ arrowOpen: childrenOpen }"
          ></i>
        </div>
        <span class="tooltip" v-if="!hideTooltip && !item.children">{{ item.label }}</span>
        <div class="tooltip-expanded" v-if="item.children && !top">
          <div v-for="item in item.children" :key="item.id">
            <span class="router-link">
              <router-link :to="item.route">{{ item.label }}</router-link>
            </span>
            <div class="nested-tooltip-items" v-if="item.children">
              <div class="child-link" v-for="itemChild in item.children" :key="itemChild.id">
                <router-link :to="itemChild.route">{{ itemChild.label }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.children && childrenOpen" class="children-container">
      <div>
        <div class="children-content" v-for="child in item.children" :key="child.route">
          <SideBarItem :item="child" :is-open="isOpen"></SideBarItem>
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
    isOpen: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false
    }
  },
  created() {
    window.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.childrenOpen = false
      }
    })
  },
  methods: {
    openNestedNav() {
      let sidebar = document.querySelector('.sidebar')
      if (sidebar.classList.contains('open')) {
        this.childrenOpen = !this.childrenOpen
      }
    },
  },
}
</script>

<style scoped lang="scss"></style>
