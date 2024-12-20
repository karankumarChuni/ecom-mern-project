import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/product`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("Oneuptoken"); // Retrieve the token from local storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProductByCategory: builder.query({
      query: ({ id, url }) => ({
        url: `product-by-category/${id}/?${url}`,
        method: "GET",
      }),
    }),
    getProductBySearch: builder.query({
      query: (name) => ({
        url: `search/${name}`,
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product-detail/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductByCategoryQuery,
  useGetSingleProductQuery,
  useGetProductBySearchQuery,
} = productApi;
