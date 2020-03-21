export default function ({
  store, redirect, route, $swal,
}) {
  if (store.state.mobileNav) {
    store.commit('TOGGLE_MOBILE_NAV', false);
  }

  // 登入但未驗證 Email
  if (route.path.includes('account/edit') && (!store.state.userInfo.emailVerified
    && store.state.userInfo.emailVerified !== undefined)) {
    return;
  }

  // 未登入下打開登入視窗
  if ((store.state.userInfo.emailVerified == null || !store.state.userInfo.emailVerified)
  && (route.path.includes('edit')
  || route.path.includes('account') || route.path.includes('order')
  || route.path.includes('chat') || route.path.includes('mail')
  || route.path.includes('account'))) {
    $swal.fire({
      icon: 'error',
      title: '請先至信箱完成驗證',
    });
    if (store.state.userInfo.userId) {
      redirect('/account/edit');
    } else {
      redirect('/');
    }
  }
}
