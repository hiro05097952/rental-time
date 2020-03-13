import swal from 'sweetalert2/dist/sweetalert2.min';

const swalmix = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

const confirm = swal.mixin({
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '確認',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: true,
});

export default function (ctx, inject) {
  ctx.$swal = swalmix;
  ctx.$swalConfirm = confirm;
  inject('swal', swalmix);
  inject('swalConfirm', confirm);
}
