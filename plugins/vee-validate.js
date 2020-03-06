/* eslint-disable camelcase */
import Vue from 'vue';
import {
  localize, ValidationProvider, extend, configure, ValidationObserver,
} from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW.json';
import {
  email, required, min, max, confirmed, integer, max_value, min_value,
} from 'vee-validate/dist/rules.umd';

localize('zh_TW', zh_TW);
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
extend('email', email);
extend('required', required);
extend('min', min);
extend('max', max);
extend('confirmed', confirmed);
extend('integer', integer);
extend('max_value', max_value);
extend('min_value', min_value);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
