import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://example.com' }),
  endpoints: (builder) => ({
    // Define your API endpoints here
    getUsers: builder.query({
      query: () => 'users',
    }),
  }),
})

// Export hooks for usage in functional components
export const { useGetUsersQuery } = api
