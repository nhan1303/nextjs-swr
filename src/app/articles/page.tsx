"use client";

import { ArticleList } from "@/app/components/ArticleList";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import React from "react";

import { useArticles } from "./hooks/useArticles";

import { DEFAULT_ARTICLE_PARAMS } from "@/app/constants";
import { IArticle, IArticleParams, IListResponse } from "@/app/types";
import { toQueryParams } from "../utils";
import { isEqual } from "lodash";

export interface IArticlesProps {}

const Articles = (props: IArticlesProps) => {
  const [params, setParams] = React.useState<IArticleParams>(
    DEFAULT_ARTICLE_PARAMS
  );

  const queryParams: string = React.useMemo(() => {
    return toQueryParams(params as unknown as Record<string, string>);
  }, [params]);

  const swrData = useArticles({ params, queryParams });

  const { data, error, size, setSize, isValidating } = swrData;
  const isLoading = isValidating && !error;
  console.log("test swrData", swrData.data);
  const articles = data ? [].concat(...(data as any)) : [];

  // React.useEffect(() => {
  //   if (!isEqual(params, DEFAULT_ARTICLE_PARAMS)) {
  //     setSize((_size) => _size + 1);
  //   }
  // }, [params, setSize]);

  if (error) return <Box>{error.message}</Box>;

  const handleLoadmore = () => {
    // setParams((prev) => ({
    //   ...prev,
    //   offset: String(Number(prev.offset) + Number(prev.limit)),
    // }));
    setParams({
      ...params,
      offset: String(Number(params.offset) + Number(params.limit)),
    });
    // setSize(1);
    setSize((_size) => _size + 1);
  };

  const handleFilter = (keyword: string, refresh?: boolean) => {
    setParams((prev) => ({
      ...prev,
      ...(refresh
        ? {
            ...DEFAULT_ARTICLE_PARAMS,
          }
        : {}),
      filters: keyword,
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ backgroundColor: "red" }}>Article List</Box>
      <Stack flexDirection="row" gap="8px">
        <Button
          onClick={() => {
            handleFilter("North", true);
            setSize(1);
          }}
        >
          Tab Filter North
        </Button>
        <Button
          onClick={() => {
            handleFilter("East", true);
            setSize(1);
          }}
        >
          Tab Filter East
        </Button>
        <Button
          onClick={() => {
            handleFilter("West", true);
            setSize(1);
          }}
        >
          Tab Filter West
        </Button>
        <Button
          onClick={() => {
            handleFilter("", true);
            setSize(1);
          }}
        >
          Clear Filter
        </Button>
      </Stack>
      {/* {Array.isArray(data) &&
        data.map((item: IListResponse<IArticle>, index: number) => {
          return <ArticleList key={index} data={item.contents} />;
        })} */}
      {articles.map((item: IListResponse<IArticle>, index: number) => {
        return <ArticleList key={index} data={item.contents} />;
      })}

      {isLoading && <CircularProgress />}
      {!isLoading && <Button onClick={handleLoadmore}>Load more</Button>}
    </Box>
  );
};

export default Articles;
