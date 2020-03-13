export default function ({
  redirect, route,
}) {
  if (!Number(route.params.product_id) || !route.query.type
  || !Number(route.query.startTime) || !route.query.qty) {
    redirect('/');
  }
}
