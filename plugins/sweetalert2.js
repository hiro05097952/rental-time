import swal from 'sweetalert2/dist/sweetalert2.min';

const swalmix = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

export default function (ctx, inject) {
  ctx.$swal = swalmix;
  inject('swal', swalmix);
}
