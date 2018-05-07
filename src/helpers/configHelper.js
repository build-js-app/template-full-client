let isDevLocal = process.env.NODE_ENV !== 'production';

export default {
  isDevLocal,
  baseUrl: process.env.REACT_APP_BASE_URL,
  format: {
    date: 'DD/MM/YYYY',
    datePicker: 'd/m/Y'
  }
};
