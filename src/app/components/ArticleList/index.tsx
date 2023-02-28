import { ArticleCard } from "@/app/components/ArticleCard";
import { IArticle } from "@/app/types";
import { Stack } from "@mui/material";
import React from "react";

export interface IArticleListProps {
  data: IArticle[];
}

export const ArticleList: React.FC<IArticleListProps> = React.memo(
  ({ data }) => {
    return (
      <Stack sx={{ gap: "8px" }}>
        {Array.isArray(data) &&
          data.map((item: IArticle) => {
            return <ArticleCard key={item.id} data={item} />;
          })}
      </Stack>
    );
  }
);

ArticleList.displayName = "ArticleList";
