import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gettoken } from "../../Localstorage/Store";

// Debugging token retrieval
const token = localStorage.getItem("token");
console.log("Initial token:", token);

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = gettoken()?.token;
      console.log("Using token:", token); // Debug token value
      // debugger;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("No token found in localStorage.");
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Category"], // Define cache tags for endpoints
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
      providesTags: ["User"], // Enables cache invalidation
    }),
    // Get a single user by ID
    getSingleUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    // Post a new category
    postCategory: builder.mutation({
      query: (data) => ({
        url: "category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"], // Invalidates category cache
    }),
    // Update a user by ID
    patchUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }], // Cache invalidation for specific user
    }),
    // Delete a user by ID
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }], // Cache invalidation for specific user
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  usePostCategoryMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
} = userApi;
