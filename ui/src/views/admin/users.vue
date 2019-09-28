<template lang="html">
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Seen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!users || !users.length">
          <td colspan=2>{{ !users ? 'Loading...' : 'No users found' }}</td>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>
            {{ user.name }}
            <div class="small">{{ $d($utc(user.created_at), 'date') }}</div>
          </td>
          <td>
            {{ $d($utc(user.last_seen), 'datetime') }}
            <div class="small">{{ user.last_uiv }}</div>
          </td>
          <td>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: null,
    }
  },

  created () {
    this.refreshUsers()
  },

  methods: {
    refreshUsers () {
      let params = {
      }
      this.$http.get('users', { params }).then(res => {
        this.users = res.data
      })
    },
  }
}
</script>

<style lang="css" scoped>
</style>
