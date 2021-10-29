<template>
  <div class="dropdown-container">
    <div class="dropdown-items" v-for="option in dropDownOptions" :key="option.id">
      <div>{{ option.name }}</div>
    </div>
    <div class="dropdown-empty"></div>
  </div>
</template>

<script>
export default {
  name: 'SelectDropdown',
  props: {
    dropDownOptions: {
      type: Array,
      default: undefined,
    },
  },
}
</script>

<style scoped lang="scss"></style>
