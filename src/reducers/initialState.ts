import SORT_OPTIONS from 'constants/sortOptions';

export default {
  user: {
    current: undefined
  },
  record: {
    list: [],
    sortBy: SORT_OPTIONS.DATE
  },
  category: {
    list: [],
    current: undefined
  },
  common: {
    asyncAction: undefined,
    confirmAction: undefined
  }
};
