<template>
  <div id="app">
    <contact-table></contact-table>
  </div>
</template>

<script>
import contactTable from './components/contactTable'
export default {
  name: 'app',
  components: { contactTable },
  beforeCreate () {
    let params = {
      'page':1,
      'limit': 5,
      'sort': 'UserID',
      'filter': '',
      'order': 'ascending'
    }
    this.$store.dispatch("GET_CONTACT_LIST", params);
  }
}
</script>

<style lang="scss">
</style>
