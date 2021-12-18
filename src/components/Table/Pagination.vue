<template>
  <div class="pagination">
    <div class="pagination-controls">
      {{ currentPage }}
      <button class="pagination-controls__first-page" @click="firstPage">
        <img :src="require('./assets/double-arrow-left.svg')" />
      </button>
      <button class="pagination-controls__previous-page" @click="previousPage">
        <img :src="require('./assets/arrow-left.svg')" />
      </button>
      <div class="pagination-controls__pages">
        <div class="pages">
          <div
            class="pages-item"
            v-for="(page, index) in pages"
            :key="index"
            :class="{ active: currentPage === Number(page) }"
            @click="page !== '...' && this.$emit('input', Number(page))"
            v-show="page"
          >
            <span>
              {{ page }}
            </span>
            <div class="indicator" :class="{ show: currentPage === Number(page) }" />
          </div>
        </div>
      </div>
      <button class="pagination-controls__next-page" @click="nextPage">
        <img :src="require('./assets/arrow-right.svg')" />
      </button>
      <button class="pagination-controls__last-page" @click="lastPage">
        <img :src="require('./assets/double-arrow-right.svg')" />
      </button>
    </div>
    <div class="pagination-select"></div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    count: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 5,
    },
    currentPage: {
      type: [Number, String],
      default: 1,
    },
    showSelect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      maxVisiblePages: 5,
      optionsPerPage: [
        {
          name: 5,
        },
        {
          name: 10,
        },
        {
          name: 25,
        },
        {
          name: 50,
        },
      ],
    }
  },
  computed: {
    currentPerPage() {
      return this.optionsPerPage.find((item) => item.name === this.perPage)
    },
    pages() {
      if (this.total < 2) {
        return [1]
      }
      const filteredPages = this.filteredPages
      let pages = filteredPages
        ? [
            filteredPages[0] - 1 === 1 ? 1 : '...',
            ...filteredPages,
            filteredPages[filteredPages.length - 1] + 1 === this.total - 2 ? this.total - 2 : '...',
          ]
        : [...Array(this.total - 2).keys()].map((page) => page + 1)
      pages = [this.currentPage - 1, 0, ...pages, this.total - 1, this.currentPage + 1]
      return pages.map((page, key) => {
        if (key === 0) {
          return ''
        }

        if (key === pages.length - 1) {
          return ''
        }

        if (page === '...') {
          return page
        }

        return page + 1 + ''
      })
    },
    filteredPages() {
      const diff = this.maxVisiblePages / 2
      const toFilterPages = [...Array(this.total).keys()].slice(2, -2)

      if (toFilterPages.length > this.maxVisiblePages) {
        const diffFirst = this.currentPage - toFilterPages[0]
        const diffLast = this.currentPage - toFilterPages[toFilterPages.length - 1]

        if (diffFirst < diff) {
          return toFilterPages.slice(0, this.maxVisiblePages)
        } else if (diffLast >= -diff) {
          return toFilterPages.slice(-this.maxVisiblePages)
        } else {
          return toFilterPages.filter((page) => {
            const diffPage = this.currentPage - page

            return diffPage < 0 ? Math.abs(diffPage) <= diff : diffPage < diff
          })
        }
      }

      return null
    },
    total() {
      if (this.count) {
        return Math.ceil(this.count / this.perPage) || (this.count ? 1 : 1)
      }
      return 1
    },
  },
  methods: {
    firstPage() {
      console.log('first')
    },
    previousPage(page) {
      if (Number(this.currentPage) > 1) {
        return this.$emit('input')
      }
    },
    nextPage(page) {
      console.log(page, 'pagination')
      if (Number(this.currentPage) < this.total) {
        return this.$emit('input')
      }
    },
    lastPage() {
      console.log('last')
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
