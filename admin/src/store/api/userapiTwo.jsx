import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API
export const userApi = createApi({
  reducerPath: "userApi", // Name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/user", // Base URL for the API
    prepareHeaders: (headers) => {
      // Retrieve the token from local storage
      const token = localStorage.getItem("Oneuptoken");
      if (token) {
        console.log("Adding token to headers:", token); // Debugging token value
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("No token found in localStorage."); // Warn if token is missing
      }
      return headers; // Return the headers for the request
    },
  }),
  endpoints: (builder) => ({
    // Fetch user information
    getUserInfo: builder.query({
      query: () => ({
        url: `/userinfo`, // Endpoint URL
        method: "GET", // HTTP method
      }),
      providesTags: ["UserInfo"], // Optional tags for caching
    }),

    // Register a new user
    postCreateUser: builder.mutation({
      query: (data) => ({
        url: `/register`, // Endpoint URL
        method: "POST", // HTTP method
        body: data, // Data to be sent in the request body
      }),
    }),

    // Login user
    postLoginUser: builder.mutation({
      query: (data) => ({
        url: `/login`, // Endpoint URL
        method: "POST", // HTTP method
        body: data, // Data to be sent in the request body
      }),
    }),

    // Update user data
    patchUser: builder.mutation({
      query: (data) => ({
        url: `/`, // Endpoint URL
        method: "PATCH", // HTTP method
        body: data, // Data to be sent in the request body
      }),
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetUserInfoQuery,
  usePostCreateUserMutation,
  usePostLoginUserMutation,
  usePatchUserMutation,
} = userApi;
