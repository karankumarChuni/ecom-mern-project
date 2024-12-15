import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = localStorage.getItem('token'); // Fetch dynamically
      console.log("Using token:", token); // Debug token value

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Fetch dynamically
      console.log("Using token:", token); // Debug token value
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.warn("No token found in localStorage.");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
    }),
    postCategory: builder.mutation({
      query: (data) => ({
        url: 'category',
        method: 'POST',
        body: data,
      }),
    }),
    patchUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `user/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useGetAllUsersQuery, 
  useGetSingleUserQuery, 
  usePostCategoryMutation, 
  usePatchUserMutation, 
  useDeleteUserMutation 
} = userApi;
