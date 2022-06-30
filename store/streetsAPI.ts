import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Config from "react-native-config"
import { IApiResponse } from './interfaces'

const apiBaseUrl = Config.ADDRESS_BASE_URL
const apiKey = Config.ADDRESS_API_KEY

export const streetsApi = createApi({
    reducerPath: 'streetsApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
    endpoints: (builder) => ({
        getByPostcode: builder.query({
            query: (postCode: string) => ({
                url: `${postCode}/addresses?key=${apiKey}`,
                // status: renders false in case something goes wrong
                //         on the server-side, in which case
                //         optional error field becomes available
                //         containing the string with cause
                validateStatus: (response, result: IApiResponse) => !result.status,
            }),
        }),
    }),
    
})

export const { useGetByPostcodeQuery } = streetsApi