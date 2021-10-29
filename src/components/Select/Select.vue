<template>
  <div class="selectContainer">
    <span class="select-label">{{ label }}</span>
    <div class="select-input">
      <slot name="select-icon">
        <i class="bx bx-search"></i>
      </slot>
      <input />
    </div>
    <div class="dropdown-container">
      <SelectDropdown :dropDownoptions="options"></SelectDropdown>
    </div>
  </div>
</template>
<script>
import SelectDropdown from './SelectDropdown'
export default {
  name: 'Select',
  components: { SelectDropdown },
  props: {
    input: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss"></style>
