import toastr from 'toastr';
import axios from 'axios';
import _ from 'lodash';

import authService from '../services/authService';

export default {
  get: httpGet,
  post: httpPost,
  patch: httpPatch,
  put: httpPut,
  delete: httpDelete
};

function httpGet(url, queryParams) {
  let axiosData = axios.get(`${url}${getQueryString(queryParams)}`, getDefaultRequestOptions());

  return processRequest(axiosData);
}

function httpPost(url, data) {
  let request = axios.post(url, JSON.stringify(data), getDefaultRequestOptions());

  return processRequest(request);
}

function httpPut(url, data) {
  let request = axios.put(url, JSON.stringify(data), getDefaultRequestOptions());

  return processRequest(request);
}

function httpPatch(url, data) {
  let request = axios.patch(url, JSON.stringify(data), getDefaultRequestOptions());

  return processRequest(request);
}

async function httpDelete(url) {
  let request = axios.delete(url, getDefaultRequestOptions());

  return processRequest(request);
}

async function processRequest(axiosRequest) {
  try {
    let response = await axiosRequest;

    // if OK return
    if (response.status === 200) return response.data.data;

    let status = response.status;

    if (status === 401 || status === 403) {
      if (!_.endsWith(window.location, '/login')) {
        window.location = '/login';
      }
      return;
    }

    if (status === 400 || status === 500) {
      let responseData = response.data;

      if (responseData && responseData.message) {
        throw new Error(responseData.message);
      }
    }

    throw new Error(`Invalid HTTP response status ${status}`);
  } catch (err) {
    toastr.error(err);
  }
}

function getQueryString(params) {
  if (!params || !Object.keys(params).length) return '';

  const esc = encodeURIComponent;

  let query = '?';

  query += Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');

  return query;
}

function getDefaultRequestOptions() {
  return {
    headers: {
      pragma: 'no-cache',
      'Content-Type': 'application/json',
      Authorization: getAuthHeader()
    },
    validateStatus: status => true,
    credentials: 'same-origin'
  };
}

function getAuthHeader() {
  let jwt = authService.getToken();

  return `Bearer ${jwt}`;
}
