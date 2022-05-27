import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

import authService from 'services/authService';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: headers => {
      const token = authService.getToken();

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  endpoints: builder => ({
    getCategories: builder.query<Category[], string>({
      query: () => '/api/categories',
      transformResponse: (rawResult: {data: Category[]}, meta) => {
        return rawResult?.data;
      }
    })
  })
});

export const {useGetCategoriesQuery} = categoryApi;
