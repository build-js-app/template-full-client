import {mapGetters} from 'vuex';

export default {
  name: 'app',
  computed: mapGetters({
    isAjaxLoad: 'isAjaxLoad'
  })
};
