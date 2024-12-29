<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Post ID: {{ postId }}</div>
        <div class="text-body2">This is the detailed post content.</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PostPage',
  props: ['id'],
  data() {
    return {
      postId: this.id,
    }
  }
}
</script>