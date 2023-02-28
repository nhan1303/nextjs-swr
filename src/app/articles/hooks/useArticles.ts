import { DEFAULT_ARTICLE_PARAMS } from "@/app/constants";
import { IArticle, IArticleParams, IListResponse } from "@/app/types";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { toQueryParams } from "../../utils";
export interface IArticleOptions {
  params: IArticleParams;
  queryParams: string;
}

export const articlesFetcher = async (
  queryParams: string
): Promise<IListResponse<IArticle>> => {
  const response = await axios.get(`/api/articles${queryParams}`, {
    baseURL: "http://localhost:3001",
  });

  return response.data;
};

export const useArticles = (options: IArticleOptions) => {
  const swr = useSWRInfinite<IListResponse<IArticle>, Error>(
    (index: number, previousPageData: IListResponse<IArticle> | null) => {
      console.log("test getKey", {
        index,
        previousPageData,
        queryParams: options.queryParams,
      });

      if (previousPageData && previousPageData.contents.length === 0)
        return null;

      return toQueryParams({
        ...DEFAULT_ARTICLE_PARAMS,
        offset: String(
          index *
            (previousPageData
              ? Number(previousPageData.limit)
              : Number(DEFAULT_ARTICLE_PARAMS.limit))
        ),
        ...(Boolean(options.params?.filters)
          ? { filters: options.params.filters }
          : {}),
      });
    },
    (queryParams: string) => {
      console.log("test fetcher", { queryParams });

      return articlesFetcher(queryParams);
    },

    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateFirstPage: false,
    }
  );

  return swr;
};
