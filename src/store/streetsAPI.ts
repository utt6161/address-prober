import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import 'dotenv/config'
import { IApiResponse } from './interfaces'

const apiBaseUrl = process.env.ADDRESS_BASE_URL
const apiKey = process.env.ADDRESS_API_KEY

export const streetsApi = createApi({
    reducerPath: 'streetsApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
    endpoints: (builder) => ({
        getByPostcode: builder.mutation<IApiResponse, string>({
            query: (postCode: string) => ({
                url: `${postCode}/addresses?key=${apiKey}`,
                // status: renders false in case something goes wrong
                //         on the server-side, in which case
                //         optional error field becomes available
                //         containing the string with cause
                validateStatus: (response, result: IApiResponse) => result.status,
            }),
        }),
    }),
    
})

export const { useGetByPostcodeMutation } = streetsApi