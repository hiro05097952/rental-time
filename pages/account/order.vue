<template>
  <div ref="form">
    <button class="px-2 py-2 bg-green-500" @click="pay">
      付款
    </button>
  </div>
</template>

<script>
export default {
  name: 'Order',
  layout: 'front',
  data() {
    return {

    };
  },
  methods: {
    async pay() {
      try {
        const { data } = await this.$axios.post('/api/charge', {
          itemName: '100',
          pointId: '42fad280-593e-11ea-93af-b130f1f5c051',
        });
        this.$refs.form.innerHTML = data;
        document.getElementById('_form_aiochk').submit();
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
  },
};
</script>

<style>

</style>
