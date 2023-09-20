import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const options = {
  method: "GET",
  url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
  params: {
    url: "https://time.com/6266679/musk-ai-open-letter/",
    length: "3",
  },
  headers: {
    "X-RapidAPI-Key": "f7200a3fa2msh6fce24bcd1b56c4p1cb9a1jsnb1f5de797ccf",
    "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
  },
};

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => "test",
    }),
  }),
});
