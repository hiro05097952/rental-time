export default async function ({
  redirect, route, $axios,
}) {
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = await $axios.get(`/api/order/${route.params.chat_id}`);
    // console.log('datamessage', data.message);
  } catch ({ response }) {
    // console.log('err => ', response.data.message);
    redirect('/');
  }
}
