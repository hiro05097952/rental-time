export default function ({
  store, redirect, route,
}) {
  // 登入但未驗證 Email
  if (route.path.includes('account/edit') && (!store.state.userInfo.emailVerified
    && store.state.userInfo.emailVerified !== undefined)) {
    return;
  }

  // 未登入下打開登入視窗
  if (store.state.userInfo.emailVerified == null && (route.path.includes('edit')
  || route.path.includes('account') || route.path.includes('order'))) {
    redirect('/');
  }
}
