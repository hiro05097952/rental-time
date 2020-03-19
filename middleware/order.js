export default function ({
  redirect, route, store,
}) {
  if (!Number(route.params.product_id) || !route.query.type
  || !Number(route.query.startTime) || !route.query.qty || !store.state.userInfo.emailVerified) {
    redirect('/');
  }
}
