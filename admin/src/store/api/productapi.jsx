import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "product",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `product/${id}`,
        method: "GET",
      }),
    }),
    postProduct: builder.mutation({
      query: (data) => ({
        url: `product`,
        method: "POST",
        body: data,
      }),
    }),
    patchProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `product/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  usePostProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
} = productApi;
